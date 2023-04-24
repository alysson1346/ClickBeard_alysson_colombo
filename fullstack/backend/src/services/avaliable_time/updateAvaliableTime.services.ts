import { AppDataSource } from "../../data-source";
import { Available_times } from "../../entities/available_time.entity";
import { IAvailableTimes } from "../../interfaces/avaliable_time";

const updateAvaliableTimeServices = async (
  id: string,
  obj: IAvailableTimes
) => {
  const repository = AppDataSource.getRepository(Available_times);
  const allAvaliables = await repository.find();
  const avaliable = allAvaliables.find((avaliable) => avaliable.id === id);

  if (!avaliable) {
    throw new Error("Avaliable not found");
  }

  const updateAvaliable = { ...avaliable, ...obj };
  await repository.update(id, updateAvaliable);

  return updateAvaliable;
};

export default updateAvaliableTimeServices;
