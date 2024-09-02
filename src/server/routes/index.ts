import { Router } from "express";

import { CitiesController } from "./../controllers"; 

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

router.post("/cities", CitiesController.createValidation, CitiesController.create);

export { router };
