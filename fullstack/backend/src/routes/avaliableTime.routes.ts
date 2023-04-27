import { Router } from "express";

//controllers
import createAvaliableTimesController from "../controllers/avaliable_time/createAvaliableTimes.controller";
import listAvaliableTimeController from "../controllers/avaliable_time/listAvaliableTime.controller";
import filterDateDayController from "../controllers/avaliable_time/filterDateDay.controller";
import updateAvaliableTimeController from "../controllers/avaliable_time/updateAvaliableTime.controller";

//Routes
const routesAvaliableTime = Router();
routesAvaliableTime.post("/:barber_id", createAvaliableTimesController);
routesAvaliableTime.get("", listAvaliableTimeController);
routesAvaliableTime.get("/:barber_id/:date", filterDateDayController);
routesAvaliableTime.patch("/:id", updateAvaliableTimeController);

export default routesAvaliableTime;
