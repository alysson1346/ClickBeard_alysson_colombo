import { Request, Response } from "express";
import referenceSpecialtyServices from "../../services/barber/referenceSpecialty.services";

const referenceSpecialtyController = async (req: Request, res: Response) => {
  try {
    const { id_barber } = req.params;
    const { id_specialty } = req.body;

    const reference = await referenceSpecialtyServices({
      id_barber,
      id_specialty,
    });

    return res.status(201).send(reference);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default referenceSpecialtyController;
