import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtService } from "../services";


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

  const jwtData = JwtService.verify(token);

  if (jwtData === "JWT_SECRET_NOT_FOUND") {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Error verifying token",
      }
    });

    return;
  } else if (jwtData === "INVALID_TOKEN") {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Unauthorized",
      }
    });

    return;
  }

  req.headers.userId = jwtData.uid.toString();

  return next();
};
