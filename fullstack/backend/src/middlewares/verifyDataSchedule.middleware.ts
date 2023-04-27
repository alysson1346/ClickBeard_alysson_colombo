import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Available_times } from "../entities/available_time.entity";

const verifyDates = async (req: Request, res: Response, next: NextFunction) => {
  const { avaliable_time_id, date_time } = req.body;

  const repository = AppDataSource.getRepository(Available_times);
  const avaliable = await repository.findOneBy({
    id: avaliable_time_id,
  });

  if (avaliable) {
    const dateRequest = new Date(date_time);
    const dayRequest = dateRequest.getDate();
    const monthRequest = dateRequest.getMonth() + 1;
    const yearRequest = dateRequest.getFullYear();
    const hourRequest = dateRequest.getHours();
    let minutesRequest: any = dateRequest.getMinutes();

    if (minutesRequest === 0) {
      minutesRequest = "00";
    }

    const hoursAndMinutesRequest = `${hourRequest}:${minutesRequest}`;
    const dateCompleteRequest = `${dayRequest}/${monthRequest}/${yearRequest}`;

    const avaliableTime = avaliable;

    const dataAvaliable = avaliableTime.date;
    const dateAvaliablePostgres = new Date(dataAvaliable);
    const dateAvaliable = new Date(dateAvaliablePostgres);
    dateAvaliable.setHours(dateAvaliable.getHours() + 3);

    const dayAvaliable = dateAvaliable.getDate();
    const monthAvaliable = dateAvaliable.getMonth() + 1;
    const yearAvaliable = dateAvaliable.getFullYear();
    const dateCompleteAvaliable = `${dayAvaliable}/${monthAvaliable}/${yearAvaliable}`;

    if (dateCompleteRequest !== dateCompleteAvaliable) {
      return res.status(400).send({
        message: " Appointment date different from the available timetable",
      });
    }

    const verifyHorary = await repository
      .createQueryBuilder()
      .select(`available_times.${hoursAndMinutesRequest}`)
      .from(Available_times, "available_times")
      .where("available_times.id = :id", {
        id: `${avaliable.id}`,
      })
      .getRawOne();

    const hasFalseValue = Object.values(verifyHorary).includes(false);
    if (hasFalseValue) {
      return res.status(400).send({
        message: "Unavailable horary",
      });
    }
  }

  next();
};

export default verifyDates;
