import { Router } from "express";

//controllers
import createScheduleController from "../controllers/schedule/createSchedule.controller";
import listScheduleController from "../controllers/schedule/listSchedule.controller";
import cancelScheduleController from "../controllers/schedule/cancelSchedule.controllers";
import listSchedulesForIdController from "../controllers/schedule/listSchedulesForId.controller";
import finishScheduleController from "../controllers/schedule/finishedSchedule.controller";
import todayScheduleController from "../controllers/schedule/todaySchedule.controller";
import filterDataScheduleController from "../controllers/schedule/filterDateSchedule.controller";

//middlewares
import verifyDates from "../middlewares/verifyDataSchedule.middleware";

//Routes
const routesSchedule = Router();
routesSchedule.post("", verifyDates, createScheduleController);
routesSchedule.patch("/cancel/:id", cancelScheduleController);
routesSchedule.patch("/finished/:id", finishScheduleController);
routesSchedule.get("", listScheduleController);
routesSchedule.get("/:id_user", listSchedulesForIdController);
routesSchedule.get("/get/today", todayScheduleController);
routesSchedule.get("/get/filter/:date", filterDataScheduleController);

export default routesSchedule;
