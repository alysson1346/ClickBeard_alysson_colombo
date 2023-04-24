import { AppDataSource } from "../../data-source";
import { Barber } from "../../entities/barber.entity";
import { Specialty } from "../../entities/specialty.entity";
import { IReferenceSpecialty } from "../../interfaces/barber";

const referenceSpecialtyServices = async ({
  id_barber,
  id_specialty,
}: IReferenceSpecialty) => {
  const repositoryBarber = AppDataSource.getRepository(Barber);
  const Allbarbers = await repositoryBarber.find({
    relations: { specialties: true },
  });
  const barber = Allbarbers.find((barber) => barber.id === id_barber);

  if (!barber) {
    throw new Error("Barber not found");
  }

  const repositorySpecialty = AppDataSource.getRepository(Specialty);
  const allSpecialtys = await repositorySpecialty.find();
  const specialty = allSpecialtys.find(
    (specialty) => specialty.id === id_specialty
  );

  if (!specialty) {
    throw new Error("Specialty not found");
  }
  specialty.attributed = true;
  await repositorySpecialty.update(specialty.id, specialty);

  barber.specialties.push(specialty);
  await repositoryBarber.manager.save(barber);

  return barber;
};

export default referenceSpecialtyServices;
