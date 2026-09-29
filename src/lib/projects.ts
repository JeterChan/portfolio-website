import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale } from '../i18n';

export type ProjectEntry = CollectionEntry<'projects'>;

export interface Project {
  entry: ProjectEntry;
  /** Folder name, e.g. "01-riverside-museum". */
  folder: string;
  /** URL slug without the numeric prefix, e.g. "riverside-museum". */
  slug: string;
  lang: Locale;
}

const PREFIX = /^\d+[-_]/;

function parseId(id: string) {
  const [folder, lang] = id.split('/');
  return { folder, lang: lang as Locale, slug: folder.replace(PREFIX, '') };
}

function folderOrder(folder: string) {
  const match = folder.match(/^(\d+)/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

/** Published projects for a locale, in display order. */
export async function getProjects(lang: Locale = defaultLocale): Promise<Project[]> {
  const entries = await getCollection('projects', (entry) => !entry.data.draft);
  const projects = entries
    .map((entry) => ({ entry, ...parseId(entry.id) }))
    .filter((project) => project.lang === lang);

  const seen = new Map<string, string>();
  for (const project of projects) {
    const other = seen.get(project.slug);
    if (other) {
      throw new Error(
        `兩個專案資料夾產生相同網址 "/projects/${project.slug}"：${other} 與 ${project.folder}。請修改其中一個資料夾名稱。`,
      );
    }
    seen.set(project.slug, project.folder);
  }

  return projects.sort((a, b) => {
    const orderA = a.entry.data.order ?? folderOrder(a.folder);
    const orderB = b.entry.data.order ?? folderOrder(b.folder);
    return orderA - orderB || a.folder.localeCompare(b.folder);
  });
}

export function projectPath(project: Pick<Project, 'slug'>) {
  return `/projects/${project.slug}`;
}
