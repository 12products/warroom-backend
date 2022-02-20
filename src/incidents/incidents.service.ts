import { Injectable } from '@nestjs/common';
import { Incident } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreateIncidentInput, UpdateIncidentInput } from '../graphql';
import { UsersService } from '../users/users.service';

@Injectable()
export class IncidentsService {
  constructor(
    private readonly db: DatabaseService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createIncidentInput: CreateIncidentInput,
    userId: string,
  ): Promise<Incident> {
    const { organizationId } = await this.usersService.findOne(userId);
    const { serviceId, ...createIncidentData } = createIncidentInput;
    return await this.db.incident.create({
      data: {
        ...createIncidentData,
        organization: { connect: { id: organizationId } },
        service: { connect: { id: serviceId } },
      },
    });
  }

  async findAll(): Promise<Incident[]> {
    return await this.db.incident.findMany();
  }

  async findOne(id: string): Promise<Incident> {
    return await this.db.incident.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateIncidentInput: UpdateIncidentInput,
  ): Promise<Incident> {
    return await this.db.incident.update({
      where: { id },
      data: { ...updateIncidentInput },
    });
  }

  async remove(id: string): Promise<Incident> {
    return await this.db.incident.delete({ where: { id } });
  }
}
