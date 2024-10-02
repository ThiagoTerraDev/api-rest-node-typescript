import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { ICity } from "../../database/models";
import { CitiesProvider } from "../../database/providers/cities";


interface IBodyProps extends Omit<ICity, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3).max(150),
  })),
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response): Promise<void> => {
  const result = await CitiesProvider.create(req.body);

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
