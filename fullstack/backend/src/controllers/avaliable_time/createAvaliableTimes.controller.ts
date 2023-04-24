import { Request, Response } from "express";
import createAvaliableTimesServices from "../../services/avaliable_time/createAvaliableTimes.services";

const createAvaliableTimesController = async (req: Request, res: Response) => {
  try {
    const { barber_id } = req.params;
    const { date } = req.body;

    const createAvaliable = await createAvaliableTimesServices({
      date,
      barber_id,
    });

    return res.status(201).send(createAvaliable);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default createAvaliableTimesController;
