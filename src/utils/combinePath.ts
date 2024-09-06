export default function combinePath(...paths: string[]): string {
  const combinedPath = paths.join('/');
  const url = new URL(combinedPath);
  url.pathname = url.pathname.replace(/\/{2,}/g, '/');
  return url.href;
}
