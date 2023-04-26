import { AppDataSource } from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";

const todayScheduleServices = async () => {
  const today = new Date();
  const date = today.toISOString().slice(0, 10);

  const repository = AppDataSource.getRepository(Schedule);
  const schedules = await repository
    .createQueryBuilder("schedule")
    .leftJoinAndSelect("schedule.user", "user")
    .leftJoinAndSelect("schedule.barber", "barber")
    .leftJoinAndSelect("schedule.specialty", "specialty")
    .where("schedule.date_time::text LIKE :date", { date: `%${date}%` })
    .getMany();

  return schedules;
};

export default todayScheduleServices;
