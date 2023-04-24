import { AppDataSource } from "../../data-source";
import { Barber } from "../../entities/barber.entity";

const listBarbersServices = async () => {
  const repository = AppDataSource.getRepository(Barber);
  const barbers = repository.find({ relations: { specialties: true } });

  return barbers;
};

export default listBarbersServices;
