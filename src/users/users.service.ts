import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from '../graphql';
import { User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
    return await this.db.user.create({ data: { ...createUserInput } });
  }

  async findAll(): Promise<User[]> {
    return await this.db.user.findMany({
      include: {
        organization: true,
      },
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.db.user.findUnique({
      where: {
        id,
      },
      include: {
        organization: true,
      },
    });
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, ...updateUserData } = updateUserInput;
    return await this.db.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserData,
      },
    });
  }

  async remove(id: string): Promise<User> {
    return await this.db.user.delete({
      where: {
        id,
      },
    });
  }
}
