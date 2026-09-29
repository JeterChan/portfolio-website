import fs from 'node:fs';
import path from 'node:path';

const PDF_PATH = path.resolve('public/portfolio.pdf');

/** The downloadable portfolio, or null when public/portfolio.pdf is missing. */
export function getPortfolioPdf() {
  if (!fs.existsSync(PDF_PATH)) return null;
  const bytes = fs.statSync(PDF_PATH).size;
  const mb = bytes / (1024 * 1024);
  return {
    href: '/portfolio.pdf',
    size: mb >= 1 ? `${Math.round(mb)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`,
  };
}
