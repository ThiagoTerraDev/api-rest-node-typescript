import { Router } from "express";

import { CitiesController, MembersController, UsersController } from "./../controllers"; 

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

router.get("/cities", CitiesController.getAllValidation, CitiesController.getAll);
router.post("/cities", CitiesController.createValidation, CitiesController.create);
router.get("/cities/:id", CitiesController.getByIdValidation, CitiesController.getById);
router.put("/cities/:id", CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete("/cities/:id", CitiesController.deleteByIdValidation, CitiesController.deleteById);

router.get("/members", MembersController.getAllValidation, MembersController.getAll);
router.post("/members", MembersController.createValidation, MembersController.create);
router.get("/members/:id", MembersController.getByIdValidation, MembersController.getById);
router.put("/members/:id", MembersController.updateByIdValidation, MembersController.updateById);
router.delete("/members/:id", MembersController.deleteByIdValidation, MembersController.deleteById);

router.post("/login", UsersController.signInValidation, UsersController.signIn);
router.post("/register", UsersController.signUpValidation, UsersController.signUp);


export { router };
