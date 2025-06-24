import z from "zod";

export const AccountRes = z
  .object({
    data: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      avatar: z.string().nullable(),
    }),
    message: z.string(),
  })
  .strict();

export type AccountResType = z.TypeOf<typeof AccountRes>;

export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256),
  avatar: z.string().nullable(),
});

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>;
