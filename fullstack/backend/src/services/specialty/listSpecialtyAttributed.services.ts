import { AppDataSource } from "../../data-source";
import { Specialty } from "../../entities/specialty.entity";

const listSpecialtyAttributedServices = async () => {
  const repository = AppDataSource.getRepository(Specialty);
  const allSpecialties = await repository.find();
  const specialtiesFilter = allSpecialties.find(
    (specialties) => specialties.attributed === true
  );

  return specialtiesFilter;
};

export default listSpecialtyAttributedServices;
