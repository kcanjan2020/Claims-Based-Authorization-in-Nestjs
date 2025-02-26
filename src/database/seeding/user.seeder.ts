import { Injectable } from '@nestjs/common';
import { hash, genSalt } from 'bcryptjs';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

@Injectable()
export class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);
    // Clear existing users
    await dataSource.query(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`);

    // Fetch all roles
    const roles = await roleRepository.find();

    // Function to get a random role
    const getRandomRole = () => roles[Math.floor(Math.random() * roles.length)];

    await userRepository.save([
      {
        firstName: 'Admin',
        lastName: 'Admin',
        phoneNumber: '9866904450',
        email: 'admin@gmail.com',
        password: await hash('password', await genSalt()),
        roles: [getRandomRole()],
      },
      {
        firstName: 'Anjan ',
        lastName: 'KC',
        phoneNumber: '9866904450',
        email: 'kcanjan2020@gmail.com',
        password: await hash('password', await genSalt()),
        roles: [getRandomRole()],
      },
    ]);
    const userFactory = factoryManager.get(User);
    console.log('Seeding User......');
    // await userFactory.saveMany(50);
  }
}
