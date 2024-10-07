import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ICity } from "../../database/models";
import { CitiesProvider } from "../../database/providers/cities";


interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<ICity, "id"> {}

export const updateByIdValidation = validation((getSchema) => ({
  body : getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response): Promise<void> => {
  if (!req.params.id) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Id is required",
      },
    });

    return;
  }

  const result = await CitiesProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });

    return;
  }

  if (!res.headersSent) {
    res.status(StatusCodes.NO_CONTENT).json(result);
  }
};
