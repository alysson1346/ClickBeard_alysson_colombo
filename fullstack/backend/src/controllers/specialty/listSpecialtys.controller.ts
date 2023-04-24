import { Request, Response } from "express";
import listSpecialtysServices from "../../services/specialty/listSpecialtys.services";

const listSpecialtysController = async (req: Request, res: Response) => {
  try {
    const specialtys = await listSpecialtysServices();

    return res.status(200).send(specialtys);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default listSpecialtysController;
