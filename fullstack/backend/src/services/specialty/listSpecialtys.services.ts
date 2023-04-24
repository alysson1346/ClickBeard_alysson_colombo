import { AppDataSource } from "../../data-source";
import { Specialty } from "../../entities/specialty.entity";

const listSpecialtysServices = async () => {
  const repository = AppDataSource.getRepository(Specialty);
  const specialtys = repository.find();

  return specialtys;
};

export default listSpecialtysServices;
