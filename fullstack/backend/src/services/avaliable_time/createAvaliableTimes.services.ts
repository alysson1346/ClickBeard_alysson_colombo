import { AppDataSource } from "../../data-source";
import { Available_times } from "../../entities/available_time.entity";
import { Barber } from "../../entities/barber.entity";
import { ICreateAvaliableTime } from "../../interfaces/avaliable_time";
import moment from "moment-timezone";
const createAvaliableTimesServices = async ({
  date,
  barber_id,
}: ICreateAvaliableTime) => {
  const repositoryAvaliableTime = AppDataSource.getRepository(Available_times);

  const repositoryBarber = AppDataSource.getRepository(Barber);
  const allBarbers = await repositoryBarber.find();
  const barber = allBarbers.find((barber) => barber.id === barber_id);
  if (!barber) {
    throw new Error("Barber not found");
  }

  const available_time = new Available_times();
  const formattedDate = moment.tz(date, "UTC").tz("America/Sao_Paulo").toDate();
  available_time.date = formattedDate;
  available_time.barber = barber;

  repositoryAvaliableTime.create(available_time);
  await repositoryAvaliableTime.save(available_time);

  return available_time;
};

export default createAvaliableTimesServices;
