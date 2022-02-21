import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Service } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';
import { CreateServiceInput, UpdateServiceInput, User } from '../graphql';

@Injectable()
export class ServicesService {
  constructor(
    private readonly db: DatabaseService,
    private readonly usersService: UsersService,
  ) {}
  async create(
    createServiceInput: CreateServiceInput,
    userId: string,
  ): Promise<Service> {
    const { serviceGroupId, ...createServiceData } = createServiceInput;
    const { organizationId } = await this.usersService.findOne(userId);

    const data = {
      ...createServiceData,
      organization: {
        connect: { id: organizationId },
      },
    };

    if (serviceGroupId) {
      data['serviceGroup'] = {
        connect: { id: serviceGroupId },
      };
    }

    return await this.db.service.create({
      data,
    });
  }

  async permissionGuard(id: string, user: Partial<User>) {
    const service = await this.db.service.findUnique({
      where: { id },
      include: { organization: true },
    });

    if (service.organization.id !== user.organization.id) {
      throw new UnauthorizedException();
    }
  }

  async findAll(user: Partial<User>): Promise<Service[]> {
    return await this.db.service.findMany({
      where: { organization: { id: user.organization.id } },
    });
  }

  async findOne(id: string, user: Partial<User>): Promise<Service> {
    const service = await this.db.service.findUnique({
      where: { id },
      include: { incident: true, organization: true },
    });

    if (service.organization.id !== user.organization.id) {
      throw new UnauthorizedException();
    }

    return service;
  }

  async update(
    updateServiceInput: UpdateServiceInput,
    user: Partial<User>,
  ): Promise<Service> {
    const { id, ...updateServiceData } = updateServiceInput;

    this.permissionGuard(id, user);

    return await this.db.service.update({
      where: { id },
      data: { ...updateServiceData },
    });
  }

  async remove(id: string, user: Partial<User>): Promise<Service> {
    this.permissionGuard(id, user);

    return await this.db.service.delete({ where: { id } });
  }
}
