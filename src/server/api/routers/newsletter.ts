import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const newsletterRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      return ctx.prisma.subscriber.create({
        data: {
          email: input.email,
        },
      });
    }),
});
