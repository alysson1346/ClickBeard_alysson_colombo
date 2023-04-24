import { Router } from "express";

//controllers
import createUserController from "../controllers/user/createUser.controller";
import listUsersController from "../controllers/user/listUser.controller";
import listOneUserControler from "../controllers/user/listOneuser.controller";
import loginUserController from "../controllers/user/loginUserController";

//middlewares
import verifyEmailExist from "../middlewares/verifyEmail.middlewares";

//Routes
const routesUsers = Router();
routesUsers.post("", verifyEmailExist, createUserController);
routesUsers.post("/login", loginUserController);
routesUsers.get("", listUsersController);
routesUsers.get("/:id", listOneUserControler);

export default routesUsers;
