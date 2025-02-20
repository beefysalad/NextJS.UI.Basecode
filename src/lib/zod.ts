import { APP_STRINGS } from "@/app/common/magic-strings";
import { z } from "zod";

export const schema = z.object({
  email: z
    .string()
    .email({ message: APP_STRINGS.ERRORS.VALIDATION.INVALID_EMAIL }),
  password: z
    .string()
    .min(4, { message: APP_STRINGS.ERRORS.VALIDATION.PASSWORD_TOO_SHORT }),
});
