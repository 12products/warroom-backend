import { Injectable } from '@nestjs/common';
import { Service } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';
import { CreateServiceInput, UpdateServiceInput } from '../graphql';

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

    return this.db.service.create({
      data,
    });
  }

  async findAll(): Promise<Service[]> {
    return this.db.service.findMany({});
  }

  async findOne(id: string): Promise<Service> {
    return this.db.service.findUnique({ where: { id } });
  }

  async update(updateServiceInput: UpdateServiceInput): Promise<Service> {
    const { id, ...updateServiceData } = updateServiceInput;
    return this.db.service.update({
      where: { id },
      data: { ...updateServiceData },
    });
  }

  async remove(id: string): Promise<Service> {
    return this.db.service.delete({ where: { id } });
  }
}
