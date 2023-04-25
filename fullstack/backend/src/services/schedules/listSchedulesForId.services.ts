import { AppDataSource } from "../../data-source";
import { Schedule } from "../../entities/schedule.entity";

const listSchedulesForIdService = async (id: string) => {
  const repository = AppDataSource.getRepository(Schedule);
  const allSchedules = await repository.find({
    relations: ["user", "barber", "specialty"],
  });

  const schedulesUser = allSchedules.filter(
    (schedule) => schedule.user.id === id
  );

  return schedulesUser.reverse();
};

export default listSchedulesForIdService;
