import { AppDataSource } from "../../data-source";
import { Available_times } from "../../entities/available_time.entity";

const listAvaliableTimeServices = async () => {
  const repository = AppDataSource.getRepository(Available_times);
  const allAvaliables = repository.find({ relations: { barber: true } });

  return allAvaliables;
};

export default listAvaliableTimeServices;
