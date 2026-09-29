import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Entry id = "<folder>/<lang>", e.g. "01-riverside-museum/en".
const idFromPath = ({ entry }: { entry: string }) => {
  const match = entry.match(/^(.+?)\/index\.([a-z]{2}(?:-[a-z]{2})?)\.md$/i);
  if (!match) throw new Error(`內容檔名需為 <資料夾>/index.<語系>.md：${entry}`);
  return `${match[1]}/${match[2].toLowerCase()}`;
};

const projects = defineCollection({
  loader: glob({
    base: './content/projects',
    pattern: '[!_]*/index.*.md',
    generateId: idFromPath,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      year: z.union([z.number().int(), z.string().min(1)]),
      cover: image(),
      coverAlt: z.string().optional(),
      summary: z.string().optional(),
      studio: z.string().optional(),
      location: z.string().optional(),
      type: z.string().optional(),
      instructor: z.string().optional(),
      collaborators: z.union([z.string(), z.array(z.string())]).optional(),
      order: z.number().optional(),
      draft: z.boolean().default(false),
    }),
});

const profile = defineCollection({
  loader: glob({
    base: './content/profile',
    pattern: 'index.*.md',
    generateId: ({ entry }) => entry.match(/index\.([a-z-]+)\.md$/i)?.[1] ?? entry,
  }),
  schema: z.object({
    name: z.string().min(1),
    role: z.string().optional(),
    location: z.string().optional(),
    summary: z.string().optional(),
    email: z.email().optional(),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
  }),
});

export const collections = { projects, profile };
