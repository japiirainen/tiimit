import { createRouter } from 'server/trpc';
import { z } from 'zod';

export const teamGroupRouter = createRouter()
  .mutation('.add', {
    input: z.object({
      id: z.string().uuid().optional(),
      name: z.string().min(1).max(100),
      owner: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.teamGroup.create({
        data: input,
      });
    },
  })
  .query('.user.all', {
    input: z.object({
      userId: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.teamGroup.findMany({
        where: {
          owner: input.userId,
        },
      });
    },
  })
  .query('.all', {
    async resolve({ ctx }) {
      return ctx.prisma.teamGroup.findMany();
    },
  });
