import fs from 'node:fs';
import type { ImageMetadata } from 'astro';
import { markdownToHtml } from 'satteri';
import { findProjectImage, listProjectImages } from './images';
import type { Project } from './projects';

/*
 * Layout blocks for project pages.
 *
 *   ::full{src="01.jpg" alt="..." caption="..."}
 *   ::drawing{src="plan.png" caption="Ground floor plan 1:200"}
 *   ::row{src="a.jpg, b.jpg, c.jpg" caption="..."}
 *
 *   :::text-left{src="model.jpg" alt="..."}
 *   Paragraphs that sit beside the image.
 *   :::
 *
 * Anything outside a block is ordinary text.
 */

export interface BlockImage {
  image: ImageMetadata;
  alt: string;
}

export type Block =
  | { type: 'text'; html: string }
  | ({ type: 'full'; caption?: string } & BlockImage)
  | ({ type: 'drawing'; caption?: string } & BlockImage)
  | { type: 'row'; images: BlockImage[]; caption?: string }
  | ({ type: 'text-image'; side: 'left' | 'right'; html: string; caption?: string } & BlockImage);

const LEAF_BLOCKS = ['full', 'drawing', 'row'] as const;
const CONTAINER_BLOCKS = ['text-left', 'text-right'] as const;
const ALL_BLOCKS = [...LEAF_BLOCKS, ...CONTAINER_BLOCKS];

const CONTAINER_OPEN = /^:::\s*([\w-]+)\s*(?:\{(.*)\})?\s*$/;
const CONTAINER_CLOSE = /^:::\s*$/;
const LEAF = /^::\s*([\w-]+)\s*(?:\{(.*)\})?\s*$/;

export class ContentError extends Error {
  constructor(file: string, line: number, message: string) {
    super(`\n\n  ${file} 第 ${line} 行\n  ${message}\n`);
    this.name = 'ContentError';
  }
}

function renderMarkdown(source: string) {
  const text = source.trim();
  if (!text) return '';
  return markdownToHtml(text, { features: { smartPunctuation: true } }).html;
}

function parseAttributes(raw = '') {
  const attrs: Record<string, string> = {};
  for (const match of raw.matchAll(/([\w-]+)\s*=\s*"([^"]*)"/g)) {
    attrs[match[1]] = match[2].trim();
  }
  return attrs;
}

/** Line in the source file where the markdown body starts (1-based offset). */
function bodyLineOffset(filePath: string | undefined, body: string) {
  if (!filePath || !fs.existsSync(filePath)) return 0;
  const raw = fs.readFileSync(filePath, 'utf8');
  const index = raw.indexOf(body);
  return index < 0 ? 0 : raw.slice(0, index).split('\n').length - 1;
}

export function parseBlocks(project: Project): Block[] {
  const { entry, folder } = project;
  const file = entry.filePath ?? `content/projects/${folder}`;
  const body = entry.body ?? '';
  const offset = bodyLineOffset(entry.filePath, body);
  const title = entry.data.title;

  const fail = (line: number, message: string): never => {
    throw new ContentError(file, line + offset, message);
  };

  const resolveImage = (line: number, name: string, alt?: string, caption?: string): BlockImage => {
    const image = findProjectImage(folder, name);
    if (!image) {
      const available = listProjectImages(folder);
      fail(
        line,
        `找不到圖片 "${name}"。請確認檔名（含副檔名、大小寫）與圖片放在同一個專案資料夾。` +
          (available.length ? `\n  這個資料夾裡的圖片有：${available.join(', ')}` : ''),
      );
    }
    return { image: image!, alt: alt || caption || title };
  };

  const requireSrc = (line: number, name: string, attrs: Record<string, string>) => {
    if (!attrs.src) fail(line, `"${name}" 區塊缺少 src，例如 ${name === 'row' ? '::row{src="a.jpg, b.jpg"}' : `::${name}{src="01.jpg"}`}`);
    return attrs.src;
  };

  const blocks: Block[] = [];
  const lines = body.split('\n');
  let text: string[] = [];

  const flushText = () => {
    const html = renderMarkdown(text.join('\n'));
    if (html) blocks.push({ type: 'text', html });
    text = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const lineNo = i + 1;
    const line = lines[i];

    const open = line.match(CONTAINER_OPEN);
    if (open && !CONTAINER_CLOSE.test(line)) {
      const name = open[1];
      if (!(CONTAINER_BLOCKS as readonly string[]).includes(name)) {
        fail(
          lineNo,
          (LEAF_BLOCKS as readonly string[]).includes(name)
            ? `"${name}" 區塊只用兩個冒號：::${name}{...}`
            : `不認得的區塊 ":::${name}"。可用的區塊：${ALL_BLOCKS.join(', ')}`,
        );
      }
      const attrs = parseAttributes(open[2]);
      const src = requireSrc(lineNo, name, attrs);
      const inner: string[] = [];
      let closed = false;
      for (i = i + 1; i < lines.length; i++) {
        if (CONTAINER_CLOSE.test(lines[i])) {
          closed = true;
          break;
        }
        inner.push(lines[i]);
      }
      if (!closed) fail(lineNo, `":::${name}" 區塊沒有結尾。請在文字後面加一行 :::`);
      flushText();
      blocks.push({
        type: 'text-image',
        side: name === 'text-left' ? 'left' : 'right',
        html: renderMarkdown(inner.join('\n')),
        caption: attrs.caption,
        ...resolveImage(lineNo, src, attrs.alt, attrs.caption),
      });
      continue;
    }

    const leaf = line.match(LEAF);
    if (leaf) {
      const name = leaf[1];
      const attrs = parseAttributes(leaf[2]);
      if ((CONTAINER_BLOCKS as readonly string[]).includes(name)) {
        fail(lineNo, `"${name}" 區塊要包住文字，請用三個冒號開頭並以 ::: 結尾：\n  :::${name}{src="..."}\n  文字…\n  :::`);
      }
      if (!(LEAF_BLOCKS as readonly string[]).includes(name)) {
        fail(lineNo, `不認得的區塊 "::${name}"。可用的區塊：${ALL_BLOCKS.join(', ')}`);
      }
      const src = requireSrc(lineNo, name, attrs);
      flushText();
      if (name === 'row') {
        const files = src.split(',').map((s) => s.trim()).filter(Boolean);
        if (files.length < 2 || files.length > 4) {
          fail(lineNo, `"row" 區塊需要 2–4 張圖片，目前有 ${files.length} 張。`);
        }
        const alts = (attrs.alt ?? '').split(',').map((s) => s.trim());
        blocks.push({
          type: 'row',
          caption: attrs.caption,
          images: files.map((f, n) => resolveImage(lineNo, f, alts[n], attrs.caption)),
        });
      } else {
        blocks.push({
          type: name as 'full' | 'drawing',
          caption: attrs.caption,
          ...resolveImage(lineNo, src, attrs.alt, attrs.caption),
        });
      }
      continue;
    }

    text.push(line);
  }

  flushText();
  return blocks;
}
