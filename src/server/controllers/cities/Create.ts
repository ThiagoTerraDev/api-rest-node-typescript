import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { ICity } from "../../database/models";

interface IBodyProps extends Omit<ICity, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3),
  })),
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response): Promise<void> => {
  console.log(req.body);

  res.status(StatusCodes.CREATED).json(1);
};
