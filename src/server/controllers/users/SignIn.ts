import { IUser } from "../../database/models";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { Request, Response } from "express";
import { UsersProvider } from "../../database/providers/users";
import { StatusCodes } from "http-status-codes";
import { PasswordCrypto } from "../../shared/services";


interface IBodyProps extends Omit<IUser, "id" | "name"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email().min(5),
    password: yup.string().required().min(6),
  })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps> , res: Response): Promise<void> => {
  const { email, password } = req.body;

  const result = await UsersProvider.getByEmail(email);

  if (result instanceof Error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Invalid email or password",
      }
    });

    return;
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(password, result.password);

  if (!passwordMatch) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Invalid email or password",
      }
    });
  } else {
    res.status(StatusCodes.OK).json({
      accessToken: "test.test.test"
    });
  }
};
