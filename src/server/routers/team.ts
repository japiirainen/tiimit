import { createRouter } from 'server/trpc';
import { z } from 'zod';

export const teamRouter = createRouter().mutation('.add', {
  input: z.object({
    id: z.string().uuid().optional(),
    name: z.string().nonempty(),
    participants: z.array(z.string().nonempty()),
    groupId: z.string().uuid(),
    captain: z.string().nonempty().optional(),
  }),

  async resolve({ ctx, input }) {
    return await ctx.prisma.team.create({ data: input });
  },
});
