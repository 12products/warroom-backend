import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Incident } from '@prisma/client';
import { permissionGuard } from '../auth/permission.guard';
import { DatabaseService } from '../database/database.service';
import { CreateIncidentInput, UpdateIncidentInput, User } from '../graphql';
import { UsersService } from '../users/users.service';

@Injectable()
export class IncidentsService {
  constructor(
    private readonly db: DatabaseService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createIncidentInput: CreateIncidentInput,
    user: User,
  ): Promise<Incident> {
    const { serviceId, ...createIncidentData } = createIncidentInput;

    return await this.db.incident.create({
      data: {
        ...createIncidentData,
        organization: { connect: { id: user.organization.id } },
        service: { connect: { id: serviceId } },
      },
    });
  }

  async findAll(user: User): Promise<Incident[]> {
    return await this.db.incident.findMany({
      where: { organization: { id: user.organization.id } },
    });
  }

  async findOne(id: string, user: User): Promise<Incident> {
    const incident = await this.db.incident.findUnique({
      where: { id },
    });

    if (incident.organizationId !== user.organization.id) {
      throw new UnauthorizedException();
    }

    return incident;
  }

  async update(
    id: string,
    updateIncidentInput: UpdateIncidentInput,
    user: User,
  ): Promise<Incident> {
    permissionGuard(this.db.incident, id, user);

    return await this.db.incident.update({
      where: { id },
      data: { ...updateIncidentInput },
    });
  }

  async remove(id: string, user: User): Promise<Incident> {
    permissionGuard(this.db.incident, id, user);

    return await this.db.incident.delete({ where: { id } });
  }
}
