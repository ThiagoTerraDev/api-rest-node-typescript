import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";


interface IParamProps {
  id?: number;
}

interface IBodyProps {
  name: string;
}

export const updateByIdValidation = validation((getSchema) => ({
  body : getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response): Promise<void> => {
  if (Number(req.params.id) === 99999) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Record not found",
      },
    });
  }

  res.status(StatusCodes.NO_CONTENT).send();
};