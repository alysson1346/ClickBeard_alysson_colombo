import { Request, Response } from "express";
import loginUserServices from "../../services/user/loginUser.services";

const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await loginUserServices({ email, password });

    return res.status(201).json({ token });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default loginUserController;
