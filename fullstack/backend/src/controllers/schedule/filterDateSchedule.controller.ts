import { Request, Response } from "express";
import filterDateScheduleServices from "../../services/schedules/filterDateSchedule.services";

const filterDataScheduleController = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const schedules = await filterDateScheduleServices(date);

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

export default filterDataScheduleController;
