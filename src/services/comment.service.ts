import { prisma } from "../index";

const createComment = async (data: {
  body: string;
  userId: number;
  recipeId: number;
}) => {
  const comment = await prisma.comment.create({
    data,
  });

  return comment;
};

const getAllCommentForRecipe = async (recipeId: number) => {
  const comments = prisma.comment.findMany({
    where: {
      recipeId,
    },
    include: {
      user: true,
    },
  });

  return comments;
};

export { createComment, getAllCommentForRecipe };
