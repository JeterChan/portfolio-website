import type { ImageMetadata } from 'astro';

// Every image inside a project folder, keyed by root-relative path:
// "/content/projects/01-riverside-museum/01-aerial.jpg".
const projectImages = import.meta.glob<ImageMetadata>(
  '/content/projects/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' },
);

export function findProjectImage(folder: string, file: string): ImageMetadata | undefined {
  return projectImages[`/content/projects/${folder}/${file}`];
}

export function listProjectImages(folder: string): string[] {
  const prefix = `/content/projects/${folder}/`;
  return Object.keys(projectImages)
    .filter((key) => key.startsWith(prefix))
    .map((key) => key.slice(prefix.length));
}
