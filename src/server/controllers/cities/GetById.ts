import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";


interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const getById = async (req: Request<IParamProps>, res: Response): Promise<void> => {

  if (Number(req.params.id) === 99999) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Record not found",
      },
    });
  }

  res.status(StatusCodes.OK).json({
    id: req.params.id,
    name: "Caxias do Sul",
  });
};