export const getStoragePathFromUrl = (url: string): string => {
  const match = url.match(/\/o\/(.*?)\?/);
  return match ? decodeURIComponent(match[1]) : "";
};
