import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Specialty } from "../entities/specialty.entity";

const verifySpecialtyNameExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const repository = AppDataSource.getRepository(Specialty);
  const SpecialNameExists = await repository.findOneBy({ name: name });

  if (SpecialNameExists) {
    return res.status(400).send({ message: `${name} specialty already exist` });
  }
  next();
};

export default verifySpecialtyNameExist;
