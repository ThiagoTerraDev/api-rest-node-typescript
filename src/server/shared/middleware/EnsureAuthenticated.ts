import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";


export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Unauthorized",
      }
    });

    return;
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Unauthorized",
      }
    });

    return;
  }

  if (token !== "test.test.test") {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Unauthorized",
      }
    });

    return;
  }

  return next();
};
