export default function debounce(callback: (...args: unknown[]) => unknown, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return function (...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}
