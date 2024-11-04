import { Router } from "express";

import { CitiesController, MembersController, UsersController } from "./../controllers"; 
import { ensureAuthenticated } from "../shared/middleware";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

router.get("/cities", ensureAuthenticated, CitiesController.getAllValidation, CitiesController.getAll);
router.post("/cities", ensureAuthenticated, CitiesController.createValidation, CitiesController.create);
router.get("/cities/:id", ensureAuthenticated, CitiesController.getByIdValidation, CitiesController.getById);
router.put("/cities/:id", ensureAuthenticated, CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete("/cities/:id", ensureAuthenticated, CitiesController.deleteByIdValidation, CitiesController.deleteById);

router.get("/members", ensureAuthenticated, MembersController.getAllValidation, MembersController.getAll);
router.post("/members", ensureAuthenticated, MembersController.createValidation, MembersController.create);
router.get("/members/:id", ensureAuthenticated, MembersController.getByIdValidation, MembersController.getById);
router.put("/members/:id", ensureAuthenticated, MembersController.updateByIdValidation, MembersController.updateById);
router.delete("/members/:id", ensureAuthenticated, MembersController.deleteByIdValidation, MembersController.deleteById);

router.post("/login", UsersController.signInValidation, UsersController.signIn);
router.post("/register", UsersController.signUpValidation, UsersController.signUp);


export { router };
