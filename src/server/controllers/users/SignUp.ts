import { IUser } from "../../database/models";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { Request, Response } from "express";
import { UsersProvider } from "../../database/providers/users";
import { StatusCodes } from "http-status-codes";


interface IBodyProps extends Omit<IUser, "id"> {}

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().required().email().min(5),
    password: yup.string().required().min(6),
  })),
}));

export const signUp = async (req: Request<{}, {}, IBodyProps> , res: Response): Promise<void> => {
  const result = await UsersProvider.create(req.body);

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });

    return;
  }

  res.status(StatusCodes.CREATED).json(result);
};
