export const isEmptyString = (value: string): boolean => {
  return value === "" ? true : false;
};

export const getFirstLetter = (value: string): string => {
  return value.slice(0, 1);
};

export const generateOTP = (): { otp: number; expiresAt: Date } => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration
  return {
    otp,
    expiresAt,
  };
};

export const generateRandomPassword = (): string => {
  let randomString: string = "";
  const length = 10;
  while (randomString.length < length) {
    randomString += Math.random().toString(36).substring(2, 15);
  }
  return randomString.substring(0, length);
};
