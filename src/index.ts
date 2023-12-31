import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";
import { userController } from "./controllers/user.controller";
import { recipeController } from "./controllers/recipe.controller";
import { commentController } from "./controllers/comment.controller";

const prisma = new PrismaClient();
const app = new Elysia();

app.use(userController as any);
app.use(recipeController as any);
app.use(commentController as any);
app.all("/", () => {
  console.log("Hello, World!");

  return { message: "Hello, World!" };
});

const port = process.env.PORT ?? 4040;

app.listen(port, () => {
  console.log("Server is running on port 4040");
});

export { app, prisma };
