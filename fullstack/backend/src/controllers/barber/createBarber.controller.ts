import { Request, Response } from "express";
import createBarberServices from "../../services/barber/createBarber.services";

const createBarberController = async (req: Request, res: Response) => {
  try {
    const { name, age, hiring_date } = req.body;

    const newBarber = await createBarberServices({ name, age, hiring_date });

    return res.status(201).send(newBarber);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default createBarberController;
