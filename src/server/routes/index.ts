import { Router } from "express";

import { CitiesController } from "./../controllers"; 

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

router.get("/cities", CitiesController.getAllValidation, CitiesController.getAll);

router.get("/cities/:id", CitiesController.getByIdValidation, CitiesController.getById);

router.post("/cities", CitiesController.createValidation, CitiesController.create);

export { router };
