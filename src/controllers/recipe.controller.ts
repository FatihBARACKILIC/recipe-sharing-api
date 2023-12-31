import Elysia, { t, type Context } from "elysia";
import { createRecipe, getAllRecipes } from "../services/recipe.service";
import { verifyToken } from "../services/auth.service";

const recipeController = (app: Elysia) => {
  app.post("/create-recipe", async (context: Context) => {
    try {
      const authHeader = context.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) throw new Error("Invalid Token");

      const verifiedToken = verifyToken(token);

      const { title, body } = context.body as {
        title: string;
        body: string;
      };

      const newRecipe = await createRecipe({
        title,
        body,
        userId: verifiedToken.id,
      });

      return newRecipe;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  });

  app.get("/recipies", async () => {
    try {
      const recipies = await getAllRecipes();
      return recipies;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  });
};

export { recipeController };
