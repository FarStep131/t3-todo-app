import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createInput, toggleInput, updateInput } from "~/server/types";

export const todoRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return todos.map(({ id, text, isCompleted }) => ({
      id,
      text,
      isCompleted,
    }));
  }),
  create: protectedProcedure.input(createInput).mutation(({ ctx, input }) => {
    return ctx.prisma.todo.create({
      data: {
        text: input,
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }),
  toggle: protectedProcedure.input(toggleInput).mutation(({ ctx, input }) => {
    const { id, is_completed } = input;
    return ctx.prisma.todo.update({
      where: {
        id,
      },
      data: {
        isCompleted: is_completed,
      },
    });
  }),
  update: protectedProcedure.input(updateInput).mutation(({ ctx, input }) => {
    const { id, text } = input;
    return ctx.prisma.todo.update({
      where: {
        id,
      },
      data: {
        text,
      },
    });
  }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.todo.delete({
      where: {
        id: input,
      },
    });
  }),
});
