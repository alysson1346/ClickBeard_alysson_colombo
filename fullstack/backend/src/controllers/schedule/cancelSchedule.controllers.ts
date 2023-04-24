import { Request, Response } from "express";
import cancelScheduleService from "../../services/schedules/cancelSchedule.services";

const cancelScheduleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cancel = await cancelScheduleService(id);

    return res.status(201).send(cancel);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default cancelScheduleController;
