import { Request, Response } from "express";
import listScheduleService from "../../services/schedules/listSchedules.services";

const listScheduleController = async (req: Request, res: Response) => {
  try {
    const listSchedules = await listScheduleService();
    return res.status(200).send(listSchedules);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default listScheduleController;
