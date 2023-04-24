import { AppDataSource } from "../../data-source";
import { Specialty } from "../../entities/specialty.entity";

const createSpecialtyServices = async (name: string) => {
  const repository = AppDataSource.getRepository(Specialty);

  const specialty = new Specialty();
  specialty.name = name;

  repository.create(specialty);
  await repository.save(specialty);

  return specialty;
};

export default createSpecialtyServices;
