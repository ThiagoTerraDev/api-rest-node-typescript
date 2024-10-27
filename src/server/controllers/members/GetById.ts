import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { MembersProvider } from "../../database/providers/members";


interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const getById = async (req: Request<IParamProps>, res: Response): Promise<void> => {
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "Id is required",
      },
    });

    return;
  }

  const result = await MembersProvider.getById(req.params.id);

  if (result instanceof Error) {
    if (result.message === "Record not found") {
      res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: result.message,
        }
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message,
        },
      });
    }
    
    return;
  }

  res.status(StatusCodes.OK).json(result);
};
