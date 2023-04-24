import { Request, Response } from "express";
import createScheduleServices from "../../services/schedules/createSchedule.services";

const createScheduleController = async (req: Request, res: Response) => {
  try {
    const {
      user_email,
      barber_id,
      specialty_id,
      date_time,
      avaliable_time_id,
    } = req.body;
    const schedule = await createScheduleServices({
      user_email,
      barber_id,
      specialty_id,
      date_time,
      avaliable_time_id,
    });

    return res.status(201).send(schedule);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default createScheduleController;
