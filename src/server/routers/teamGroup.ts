import { createRouter } from 'server/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const teamGroupRouter = createRouter()
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      name: z.string().min(1).max(100),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.teamGroup.create({
        data: input,
      });
    },
  })
  .query('all', {
    async resolve({ ctx }) {
      return ctx.prisma.teamGroup.findMany();
    },
  });
