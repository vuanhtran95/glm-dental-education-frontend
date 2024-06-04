export const removeTextInsideAsterisks = (inputString: string) => {
  return inputString.replace(/\*.*?\*/g, '').replace(/\(.*?\)/g, '');
};
