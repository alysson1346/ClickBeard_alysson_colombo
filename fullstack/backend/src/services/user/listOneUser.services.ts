import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const listOneUserServices = async (id: string) => {
  const repository = AppDataSource.getRepository(User);
  const user = await repository.findOne({
    where: { id: id },
    relations: ["schedules", "schedules.barber", "schedules.specialty"],
  });
  return user;
};

export default listOneUserServices;
