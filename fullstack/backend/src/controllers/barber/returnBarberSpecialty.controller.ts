import { Request, Response } from "express";
import returnBarbersSpecialtyServices from "../../services/barber/returnBarberSpecialty.services";

const returnBarbersSpecialtyControllers = async (
  req: Request,
  res: Response
) => {
  try {
    const { specialty } = req.params;
    const resultFilter = await returnBarbersSpecialtyServices(specialty);

    return res.status(200).send(resultFilter);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default returnBarbersSpecialtyControllers;
