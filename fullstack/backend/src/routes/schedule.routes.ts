import { Router } from "express";

//controllers
import createScheduleController from "../controllers/schedule/createSchedule.controller";
import listScheduleController from "../controllers/schedule/listSchedule.controller";
import cancelScheduleController from "../controllers/schedule/cancelSchedule.controllers";

//middlewares
import verifyDates from "../middlewares/verifyDataSchedule.middleware";

//Routes
const routesSchedule = Router();
routesSchedule.post("", verifyDates, createScheduleController);
routesSchedule.patch("/cancel/:id", cancelScheduleController);
routesSchedule.get("", listScheduleController);

export default routesSchedule;
