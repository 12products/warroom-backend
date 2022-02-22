import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Service, User } from '@prisma/client';
import { permissionGuard } from '../auth/permission.guard';
import { DatabaseService } from '../database/database.service';
import { UsersService } from '../users/users.service';
import { CreateServiceInput, UpdateServiceInput } from '../graphql';

@Injectable()
export class ServicesService {
  constructor(
    private readonly db: DatabaseService,
    private readonly usersService: UsersService,
  ) {}
  async create(
    createServiceInput: CreateServiceInput,
    user: User,
  ): Promise<Service> {
    const { serviceGroupId, ...createServiceData } = createServiceInput;

    const data = {
      ...createServiceData,
      organization: {
        connect: { id: user.organizationId },
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
      where: { organization: { id: user.organizationId } },
    });
  }

  async findOne(id: string, user: User): Promise<Service> {
    const service = await this.db.service.findUnique({
      where: { id },
      include: { incident: true, organization: true },
    });

    if (service.organization.id !== user.organizationId) {
      throw new UnauthorizedException();
    }

    return service;
  }

  async update(
    updateServiceInput: UpdateServiceInput,
    user: User,
  ): Promise<Service> {
    const { id, ...updateServiceData } = updateServiceInput;

    await permissionGuard(this.db.service, id, user);

    return await this.db.service.update({
      where: { id },
      data: { ...updateServiceData },
    });
  }

  async remove(id: string, user: User): Promise<Service> {
    await permissionGuard(this.db.service, id, user);
    return await this.db.service.delete({ where: { id } });
  }
}
