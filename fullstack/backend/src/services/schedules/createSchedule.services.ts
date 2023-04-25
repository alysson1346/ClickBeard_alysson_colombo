import { AppDataSource } from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";
import { User } from "../../entities/user.entity";
import { Barber } from "../../entities/barber.entity";
import { Specialty } from "../../entities/specialty.entity";
import { Available_times } from "../../entities/available_time.entity";
import { ICreateSchedule } from "../../interfaces/schedule";
import updateAvaliableTimeServices from "../avaliable_time/updateAvaliableTime.services";

const createScheduleServices = async ({
  user_email,
  barber_id,
  specialty_id,
  date_time,
  avaliable_time_id,
}: ICreateSchedule) => {
  const repositorySchedule = AppDataSource.getRepository(Schedule);

  const repositoryUser = AppDataSource.getRepository(User);
  const allUsers = await repositoryUser.find();
  const user = allUsers.find((user) => user.email === user_email);
  if (!user) {
    throw new Error("User not found");
  }

  const repositoryBarber = AppDataSource.getRepository(Barber);
  const allBarbers = await repositoryBarber.find();
  const barber = allBarbers.find((barber) => barber.id === barber_id);
  if (!barber) {
    throw new Error("Barber not found");
  }

  const repositorySpecialty = AppDataSource.getRepository(Specialty);
  const allSpecialtys = await repositorySpecialty.find();
  const specialty = allSpecialtys.find(
    (specialty) => specialty.id === specialty_id
  );
  if (!specialty) {
    throw new Error("Specialty not found");
  }

  const repositoryAvaliableTime = AppDataSource.getRepository(Available_times);
  const allAvaliables = await repositoryAvaliableTime.find();
  const avaliable = allAvaliables.find(
    (avaliable) => avaliable.id === avaliable_time_id
  );
  if (!avaliable) {
    throw new Error("Avaliable Time not found");
  }

  const dateRequest = new Date(date_time);
  const hourRequest = dateRequest.getHours();
  let minutesRequest: any = dateRequest.getMinutes();

  if (minutesRequest === 0) {
    minutesRequest = "00";
  }

  const hoursAndMinutesRequest = `${hourRequest}:${minutesRequest}`.toString();
  const obj = { [hoursAndMinutesRequest]: false };

  const avaliableUpdated = await updateAvaliableTimeServices(
    avaliable_time_id,
    obj
  );

  const schedule = new Schedule();
  schedule.user = user;
  schedule.barber = barber;
  schedule.specialty = specialty;
  schedule.date_time = date_time;
  schedule.available_times = avaliableUpdated;

  repositorySchedule.create(schedule);
  await repositorySchedule.save(schedule);

  return schedule;
};

export default createScheduleServices;
