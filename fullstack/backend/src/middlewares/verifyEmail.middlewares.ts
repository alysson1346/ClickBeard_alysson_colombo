import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

const verifyEmailExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const repository = AppDataSource.getRepository(User);
  const emailExists = await repository.findOneBy({ email: email });

  if (emailExists) {
    return res.status(400).send({ message: "email already exist" });
  }
  next();
};

export default verifyEmailExist;
