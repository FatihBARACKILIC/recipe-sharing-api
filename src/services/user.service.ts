import { prisma } from "../index";
import { signToken } from "./auth.service";

const createNewUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const { name, email, password } = data;

    const hashedPassword = Bun.password.hashSync(password, "bcrypt");

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

const login = async (data: { email: string; password: string }) => {
  try {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error("User Not Found!");

    const valid = Bun.password.verify(password, user.password);

    if (!valid) throw new Error("Invalid Credentials!");

    const token = signToken({
      id: user.id,
      email: user.email,
    });

    return {
      message: "User Logged in Successfully",
      token,
    };
  } catch (error) {
    throw error;
  }
};
