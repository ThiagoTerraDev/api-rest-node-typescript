import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { IMember } from "../../database/models";
import { MembersProvider } from "../../database/providers/members";


interface IBodyProps extends Omit<IMember, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({ 
    email: yup.string().required().email(),
    fullName: yup.string().required().min(3),
    cityId: yup.number().integer().required().min(1),
  }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response): Promise<void> => {
  const result = await MembersProvider.create(req.body);

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
