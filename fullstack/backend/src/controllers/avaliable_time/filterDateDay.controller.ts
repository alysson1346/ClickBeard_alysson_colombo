import { Request, Response } from "express";
import filterDateDayAndBarberServices from "../../services/avaliable_time/filterDateDay.services";

const filterDateDayController = async (req: Request, res: Response) => {
  try {
    const { barber_id } = req.params;
    const { date } = req.params;
    const result = await filterDateDayAndBarberServices(date, barber_id);

    return res.status(200).send(result);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default filterDateDayController;
