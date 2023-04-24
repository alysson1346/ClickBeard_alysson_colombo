import { AppDataSource } from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";
import updateAvaliableTimeServices from "../avaliable_time/updateAvaliableTime.services";

const cancelScheduleService = async (id: string) => {
  const repository = AppDataSource.getRepository(Schedule);
  const allSchedule = await repository.find({
    relations: {
      available_times: true,
    },
  });
  const schedule = allSchedule.find((schedule) => schedule.id === id);

  if (!schedule) {
    throw new Error("Schedule not found");
  }

  const dateRequest = new Date(schedule.date_time);
  const hourRequest = dateRequest.getHours();
  const minutesRequest = dateRequest.getMinutes();
  const hoursAndMinutesRequest = `${hourRequest}:${minutesRequest}`;
  schedule.status = "Cancelado";
  const obj = { [hoursAndMinutesRequest]: true };

  await updateAvaliableTimeServices(schedule.available_times.id, obj);

  await repository.manager.save(schedule);

  return schedule;
};

export default cancelScheduleService;
