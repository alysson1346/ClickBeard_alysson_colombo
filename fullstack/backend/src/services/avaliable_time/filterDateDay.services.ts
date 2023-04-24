import { AppDataSource } from "../../data-source";
import { Available_times } from "../../entities/available_time.entity";

const filterDateDayServices = async (date: String) => {
  const repository = AppDataSource.getRepository(Available_times);
  const availableTimes = await repository
    .createQueryBuilder()
    .select("*")
    .from(Available_times, "available_times")
    .where("available_times.date::text LIKE :date", { date: `${date}%` })
    .getRawMany();
  console.log(availableTimes);

  return availableTimes;
};

export default filterDateDayServices;
