export default function debounce<T extends (...args: any[]) => void>(
  func: T
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), 1000);
  };
}
