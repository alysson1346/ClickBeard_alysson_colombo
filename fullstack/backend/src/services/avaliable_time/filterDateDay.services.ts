import { AppDataSource } from "../../data-source";
import { Available_times } from "../../entities/available_time.entity";
import { Barber } from "../../entities/barber.entity";

const filterDateDayAndBarberServices = async (date: string, id: string) => {
  const barberRepository = AppDataSource.getRepository(Barber);
  const barber = await barberRepository.findOne({ where: { id: id } });

  if (!barber) {
    throw new Error("Barber not found");
  }

  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() - 3);
  const isoDate = newDate.toISOString();
  const postgresDate = isoDate.slice(0, 10);

  const repository = AppDataSource.getRepository(Available_times);
  const availableTimes = await repository
    .createQueryBuilder("available_times")
    .leftJoinAndSelect("available_times.barber", "barber")
    .where(
      "available_times.date::text LIKE :date AND available_times.barberId = :id",
      { date: `%${postgresDate}%`, id }
    )
    .getMany();

  return availableTimes;
};

export default filterDateDayAndBarberServices;
