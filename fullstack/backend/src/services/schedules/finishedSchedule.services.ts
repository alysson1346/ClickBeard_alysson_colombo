import { AppDataSource } from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";
import updateAvaliableTimeServices from "../avaliable_time/updateAvaliableTime.services";

const finishScheduleService = async (id: string) => {
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
  if (schedule.status === "Cancelado") {
    throw new Error("Status cannot be changed as it has been canceled");
  }

  schedule.status = "Concluído";

  await repository.manager.save(schedule);

  return schedule;
};

export default finishScheduleService;
