import { prisma } from "../index";

const createRecipe = async (data: {
  title: string;
  body: string;
  userId: number;
}) => {
  const { title, body, userId } = data;

  const recipe = await prisma.recipe.create({
    data,
    // data: { title, body, userId },
  });

  return recipe;
};

const getAllRecipe = async () => {
  const recipes = await prisma.recipe.findMany({
    include: {
      user: true,
      comments: true,
    },
  });

  return recipes;
};

const getRecipeById = async (id: number) => {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  return recipe;
};

export { createRecipe, getAllRecipe, getRecipeById };
