import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { IMember } from "../../database/models";
import { MembersProvider } from "../../database/providers/members";


interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IMember, "id"> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    fullName: yup.string().required().min(3),
    cityId: yup.number().integer().required().min(1),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response): Promise<void> => {
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "Id is required",
      },
    });

    return;
  }

  const result = await MembersProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });

    return;
  }
  
  res.status(StatusCodes.NO_CONTENT).json(result);
};
