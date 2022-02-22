import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from '../graphql';
import { User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}
  async create(createUserInput: CreateUserInput, id): Promise<User> {
    return await this.db.user.create({ data: { ...createUserInput, id } });
  }

  async findAll(user: User): Promise<User[]> {
    return await this.db.user.findMany({
      where: {
        organization: {
          id: user.organizationId,
        },
      },
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
