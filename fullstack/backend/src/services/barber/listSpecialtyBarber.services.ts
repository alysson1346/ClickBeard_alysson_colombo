import { AppDataSource } from "../../data-source";
import { Barber } from "../../entities/barber.entity";

const listSpecialtyBarberService = async () => {
  const repository = AppDataSource.getRepository(Barber);
  const allBarbers = await repository.find();
  const filter = allBarbers.find((barber) => barber.specialties);
};

export default listSpecialtyBarberService;
