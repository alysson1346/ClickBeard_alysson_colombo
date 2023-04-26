import { Request, Response, NextFunction } from "express";
import { User } from "../entities/user.entity";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";

export const authentications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token !== undefined) {
    const decoded: any = jwt.verify(token, String(process.env.JWT_SECRET));
    const repositoryUser = AppDataSource.getRepository(User);
    const user = await repositoryUser.findOne({
      where: { email: decoded["email"] },
    });

    if (!user) {
      return res.status(401).send({ message: "Invalid Token" });
    }
    if (!user.is_admin) {
      return res.status(401).send({ message: "Permission denied" });
    } else {
      next();
    }
  }
};
