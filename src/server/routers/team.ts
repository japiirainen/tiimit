import { createRouter } from 'server/trpc';
import { z } from 'zod';

export const teamRouter = createRouter()
  .mutation('.add', {
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
  })
  .query('.byGroup', {
    input: z.object({
      groupId: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.team.findMany({
        where: { groupId: input.groupId },
      });
    },
  })
  .mutation('.newCaptain', {
    input: z.object({
      captainName: z.string(),
      teamId: z.string().uuid(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.team.update({
        data: {
          captain: input.captainName,
        },
        where: {
          id: input.teamId,
        },
      });
    },
  });
