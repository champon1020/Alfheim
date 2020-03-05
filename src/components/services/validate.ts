export const checkUndefined = (...args: any[]): boolean => {
  args.forEach(v => {
    if(v === undefined) return false;
  });
  return true;
};