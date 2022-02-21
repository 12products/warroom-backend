import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Service } from '@prisma/client';
import { permissionGuard } from '../auth/permission.guard';
import { DatabaseService } from '../database/database.service';
import { UsersService } from '../users/users.service';
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

  async findAll(user: User): Promise<Service[]> {
    return await this.db.service.findMany({
      where: { organization: { id: user.organization.id } },
    });
  }

  async findOne(id: string, user: User): Promise<Service> {
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
    user: User,
  ): Promise<Service> {
    const { id, ...updateServiceData } = updateServiceInput;

    permissionGuard(this.db.service, id, user);

    return await this.db.service.update({
      where: { id },
      data: { ...updateServiceData },
    });
  }

  async remove(id: string, user: User): Promise<Service> {
    permissionGuard(this.db.service, id, user);
    return await this.db.service.delete({ where: { id } });
  }
}
