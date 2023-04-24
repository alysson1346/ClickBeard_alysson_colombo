import { Request, Response } from "express";
import updateAvaliableTimeServices from "../../services/avaliable_time/updateAvaliableTime.services";

const updateAvaliableTimeController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const update = await updateAvaliableTimeServices(id, obj);

    return res.status(200).send(update);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default updateAvaliableTimeController;
