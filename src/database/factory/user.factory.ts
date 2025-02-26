import { User } from 'src/user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import dataSource from '../seeding/seeds';
import { Role } from 'src/role/entities/role.entity';
import { genSalt, hash } from 'bcryptjs';
export const UserFactory = setSeederFactory(User, async (faker) => {
  const user = new User();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.phoneNumber = faker.phone.number();
  user.email = faker.internet.email();
  user.password = await hash(faker.internet.password(), await genSalt());
  // Fetch all roles
  const roleRepository = dataSource.getRepository(Role);
  const roles = await roleRepository.find();
  // Function to get a random role
  const getRandomRole = () => roles[Math.floor(Math.random() * roles.length)];

  // Assign a random role to the user
  user.roles = [getRandomRole()];
  return user;
});
