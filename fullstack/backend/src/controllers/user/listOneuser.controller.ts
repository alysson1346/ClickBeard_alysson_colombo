import { Request, Response } from "express";
import listOneUserServices from "../../services/user/listOneUser.services";

const listOneUserControler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await listOneUserServices(id);

    return res.status(200).send(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};
export default listOneUserControler;
