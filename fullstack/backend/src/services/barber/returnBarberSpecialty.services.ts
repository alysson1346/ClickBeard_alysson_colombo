import { AppDataSource } from "../../data-source";
import { Barber } from "../../entities/barber.entity";

const returnBarbersSpecialtyServices = async (specialty: string) => {
  const repository = AppDataSource.getRepository(Barber);
  const filter = await repository.find({
    where: { specialties: { name: specialty } },
    relations: ["specialties"],
  });
  return filter;
};

export default returnBarbersSpecialtyServices;
