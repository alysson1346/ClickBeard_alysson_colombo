import { Router } from "express";

//controllers
import createSpecialtyController from "../controllers/specialty/createSpecialty.controller";
import listSpecialtysController from "../controllers/specialty/listSpecialtys.controller";

//middlewares
import verifySpecialtyNameExist from "../middlewares/verifySpecialtyExist.middlewares";

//Routes
const routesSpecialty = Router();
routesSpecialty.post("", verifySpecialtyNameExist, createSpecialtyController);
routesSpecialty.get("", listSpecialtysController);

export default routesSpecialty;
