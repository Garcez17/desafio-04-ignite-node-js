import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const findExistingUser = this.usersRepository.findByEmail(email);

    if (findExistingUser) {
      throw new Error("Email already in use");
    }

    const user = this.usersRepository.create({
      name,
      email,
    });

    return user;
  }
}

export { CreateUserUseCase };
