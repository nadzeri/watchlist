// eslint-disable-next-line
export default function debounce(callback: (...args: any) => any, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return function (...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}
