export function handleKeyEnter(callback: () => Promise<void>) {
  return (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      callback();
    }
  };
}