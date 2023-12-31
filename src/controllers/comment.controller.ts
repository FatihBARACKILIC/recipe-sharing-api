import Elysia, { type Context } from "elysia";
import {
  createComment,
  getAllCommentForRecipe,
} from "../services/comment.service";
import { verifyToken } from "../services/auth.service";

const commentController = (app: Elysia) => {
  app.post("/:recipeId/create-comment", async (context: Context) => {
    try {
      const authHeader = context.headers["authorization"];
      // const token = authHeader && authHeader.split(" ")[1];
      const { recipeId = "0" } = context.params;

      if (!authHeader) throw new Error("Invalid Token");
      else if (recipeId === "0") throw new Error("Invalid Recipe");

      const verifiedToken = verifyToken(authHeader);
      const { body } = context.body as { body: string };

      const newComment = await createComment({
        body,
        recipeId: +recipeId,
        userId: verifiedToken?.id,
      });

      return newComment;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  });

  app.get("/:recipeId/comments", async (context: Context) => {
    try {
      const { recipeId = "0" } = context.params;

      if (recipeId === "0") throw new Error("Invalid Recipe");

      const comments = await getAllCommentForRecipe(+recipeId);

      return { comments };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  });
};

export { commentController };
