import { AppDataSource } from "../../data-source";
import { Barber } from "../../entities/barber.entity";
import { IBarberCreate } from "../../interfaces/barber";

const createBarberServices = async ({
  name,
  age,
  hiring_date,
}: IBarberCreate) => {
  const repository = AppDataSource.getRepository(Barber);

  const barber = new Barber();
  barber.name = name;
  barber.age = age;
  barber.hiring_date = hiring_date;

  repository.create(barber);
  await repository.save(barber);

  return barber;
};

export default createBarberServices;
