import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserCreate } from "../../interfaces/user";
import bcrypt from "bcrypt";

const createUserServices = async ({
  name,
  email,
  is_admin,
  password,
}: IUserCreate) => {
  const repository = AppDataSource.getRepository(User);
  const user = new User();
  user.name = name;
  user.email = email;
  user.is_admin = is_admin;
  user.password = bcrypt.hashSync(password, 10);

  repository.create(user);
  await repository.save(user);

  return user;
};

export default createUserServices;
