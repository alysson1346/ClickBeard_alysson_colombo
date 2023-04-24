import { AppDataSource } from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";

const listScheduleService = async () => {
  const repository = AppDataSource.getRepository(Schedule);
  const schedules = repository.find({
    relations: {
      user: true,
      barber: true,
      specialty: true,
    },
  });

  return schedules;
};

export default listScheduleService;
