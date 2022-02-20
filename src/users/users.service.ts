import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from '../graphql';
import { User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}
  async create(createUserInput: CreateUserInput, id): Promise<User> {
    return this.db.user.create({ data: { ...createUserInput, id } });
  }

  async findAll(): Promise<User[]> {
    return await this.db.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    return this.db.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, ...updateUserData } = updateUserInput;
    return this.db.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserData,
      },
    });
  }

  async remove(id: string): Promise<User> {
    return this.db.user.delete({
      where: {
        id,
      },
    });
  }
}
