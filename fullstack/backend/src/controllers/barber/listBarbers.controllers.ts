import { Request, Response } from "express";
import listBarbersServices from "../../services/barber/listBarber.services";

const listBarbersControllers = async (req: Request, res: Response) => {
  try {
    const barbers = await listBarbersServices();

    return res.status(200).send(barbers);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default listBarbersControllers;
