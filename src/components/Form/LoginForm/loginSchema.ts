import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty("E-mail obrigatório"),
  password: z.string().nonempty("Senha obrigatória."),
});

export type TLoginFormValues = z.infer<typeof loginSchema>;
