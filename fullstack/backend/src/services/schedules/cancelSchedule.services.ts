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
  const dayRequest = dateRequest.getDate();
  const monthRequest = dateRequest.getMonth() + 1;
  const yearRequest = dateRequest.getFullYear();
  const hourRequest = dateRequest.getHours();
  let minutesRequest: any = dateRequest.getMinutes();
  if (minutesRequest === 0) {
    minutesRequest = "00";
  }
  const yearFull = `${yearRequest}-${monthRequest}-${dayRequest}T${hourRequest}:${minutesRequest}`;
  const hoursAndMinutesRequest = `${hourRequest}:${minutesRequest}`;

  const dateParts = yearFull.split(/[-T:]/).map((part) => parseInt(part));
  const requestDate = new Date(
    dateParts[0],
    dateParts[1] - 1,
    dateParts[2],
    dateParts[3],
    dateParts[4]
  );

  const now = new Date();

  const diffInMs = requestDate.getTime() - now.getTime();
  const twoHoursInMs = 2 * 60 * 60 * 1000;

  if (diffInMs < twoHoursInMs) {
    throw new Error(
      "It is not possible to cancel before two hours in advance."
    );
  }

  schedule.status = "Cancelado";
  const obj = { [hoursAndMinutesRequest]: true };

  await updateAvaliableTimeServices(schedule.available_times.id, obj);

  await repository.manager.save(schedule);

  return schedule;
};

export default cancelScheduleService;
