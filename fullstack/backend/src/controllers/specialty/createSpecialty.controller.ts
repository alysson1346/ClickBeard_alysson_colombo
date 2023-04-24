import { Request, Response } from "express";
import createSpecialtyServices from "../../services/specialty/createSpecialty.services";

const createSpecialtyController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newSpecialty = await createSpecialtyServices(name);

    return res.status(201).send(newSpecialty);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default createSpecialtyController;
