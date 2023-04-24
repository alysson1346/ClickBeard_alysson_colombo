import { Request, Response } from "express";
import listAvaliableTimeServices from "../../services/avaliable_time/listAvaliableTime.services";

const listAvaliableTimeController = async (req: Request, res: Response) => {
  try {
    const listAvaliables = await listAvaliableTimeServices();

    return res.status(200).send(listAvaliables);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default listAvaliableTimeController;
