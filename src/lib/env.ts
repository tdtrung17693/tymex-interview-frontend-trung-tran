import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
console.log("env", import.meta.env.VITE_NFT_API_URL);

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_NFT_API_URL: z.string().url("NFT API URL must be a valid URL"),
  },
  runtimeEnv: {
    VITE_NFT_API_URL: import.meta.env.VITE_NFT_API_URL || "/api",
  },
  skipValidation: !!import.meta.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
}); 

