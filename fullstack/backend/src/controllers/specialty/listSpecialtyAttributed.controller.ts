import { Request, Response } from "express";
import listSpecialtyAttributedServices from "../../services/specialty/listSpecialtyAttributed.services";

const listSpecialtyAttributedController = async (
  req: Request,
  res: Response
) => {
  try {
    const specialties = await listSpecialtyAttributedServices();

    return res.status(200).send(specialties);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default listSpecialtyAttributedController;
