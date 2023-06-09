import { Router } from "express";

//controllers
import createBarberController from "../controllers/barber/createBarber.controller";
import listBarbersControllers from "../controllers/barber/listBarbers.controllers";
import referenceSpecialtyController from "../controllers/barber/referenceSpecialty.controller";
import returnBarbersSpecialtyControllers from "../controllers/barber/returnBarberSpecialty.controller";

//Routes
const routesBarber = Router();
routesBarber.post("", createBarberController);
routesBarber.get("", listBarbersControllers);
routesBarber.get("/:specialty", returnBarbersSpecialtyControllers);
routesBarber.post("/reference/:id_barber/", referenceSpecialtyController);

export default routesBarber;
