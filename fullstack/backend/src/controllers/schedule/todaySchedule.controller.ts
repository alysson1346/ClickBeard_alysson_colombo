import { Request, Response } from "express";
import todayScheduleServices from "../../services/schedules/todaySchedule.services";

const todayScheduleController = async (req: Request, res: Response) => {
  try {
    const schedules = await todayScheduleServices();

    return res.status(200).send(schedules);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default todayScheduleController;
