import { Request, Response } from "express";
import listSchedulesForIdService from "../../services/schedules/listSchedulesForId.services";

const listSchedulesForIdController = async (req: Request, res: Response) => {
  try {
    const { id_user } = req.params;
    const result = await listSchedulesForIdService(id_user);

    return res.status(200).send(result);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default listSchedulesForIdController;
