import { Injectable } from '@nestjs/common';

import { ServiceGroup, User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { UsersService } from '../users/users.service';
import { CreateServiceGroupInput, UpdateServiceGroupInput } from '../graphql';

@Injectable()
export class ServiceGroupsService {
  constructor(
    private readonly db: DatabaseService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createServiceGroupInput: CreateServiceGroupInput,
    user: User,
  ): Promise<ServiceGroup> {
    return await this.db.serviceGroup.create({
      data: {
        ...createServiceGroupInput,
        organization: {
          connect: { id: user.organizationId },
        },
      },
    });
  }

  async findAll(): Promise<ServiceGroup[]> {
    return await this.db.serviceGroup.findMany();
  }

  async findOne(id: string): Promise<ServiceGroup> {
    return await this.db.serviceGroup.findUnique({ where: { id } });
  }

  async update(
    updateServiceGroupInput: UpdateServiceGroupInput,
  ): Promise<ServiceGroup> {
    const { id, ...updateServiceGroupData } = updateServiceGroupInput;
    return await this.db.serviceGroup.update({
      where: { id },
      data: { ...updateServiceGroupData },
    });
  }

  async remove(id: string): Promise<ServiceGroup> {
    return await this.db.serviceGroup.delete({ where: { id } });
  }
}
