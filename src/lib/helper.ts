export const isEmptyString = (value: string): boolean => {
  return value === "" ? true : false;
};

export const getFirstLetter = (value: string): string => {
  return value.slice(0, 1);
};
