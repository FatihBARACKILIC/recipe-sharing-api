import Elysia, { type Context } from "elysia";
import { createNewUser, login } from "../services/user.service";

const userController = (app: Elysia) => {
  app.post("/signup", async (context: Context) => {
    try {
      const { name, email, password } = context.body as {
        name: string;
        email: string;
        password: string;
      };

      const newUser = await createNewUser({ name, email, password });

      return {
        user: newUser,
      };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  });

  app.post("/login", async (context: Context) => {
    try {
      const { email, password } = context.body as {
        email: string;
        password: string;
      };

      const loggedInUser = login({ email, password });

      return loggedInUser;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  });
};

export { userController };
