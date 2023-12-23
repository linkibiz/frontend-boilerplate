export const isMobileDevice = () => {
  if (typeof window !== "undefined") {
    return /Mobi|Android/i.test(window.navigator.userAgent);
  }
  return false;
};
