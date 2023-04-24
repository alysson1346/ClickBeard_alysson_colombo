import { Request, Response } from "express";
import createUserServices from "../../services/user/createUser.services";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, is_admin, password } = req.body;

    const newUser = await createUserServices({
      name,
      email,
      is_admin,
      password,
    });

    return res.status(201).send(newUser);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default createUserController;
