import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Incident, User } from '@prisma/client';
import { permissionGuard } from '../auth/permission.guard';
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
    user: User,
  ): Promise<Incident> {
    const { organizationId } = await this.usersService.findOne(user.id);
    const { serviceId, assigneeId, ...createIncidentData } =
      createIncidentInput;

    const data = {
      ...createIncidentData,
      organization: { connect: { id: organizationId } },
      service: { connect: { id: serviceId } },
    };

    if (assigneeId) {
      data['assignee'] = { connect: { id: assigneeId } };
    }
    return await this.db.incident.create({ data });
  }

  async findAll(user: User): Promise<Incident[]> {
    return await this.db.incident.findMany({
      where: { organization: { id: user.organizationId } },
    });
  }

  async findOne(id: string, user: User): Promise<Incident> {
    const incident = await this.db.incident.findUnique({
      where: { id },
      include: {
        statusMessage: true,
        assignee: true,
        actionItems: true,
        events: true,
      },
    });

    if (incident.organizationId !== user.organizationId) {
      throw new UnauthorizedException();
    }
    return incident;
  }

  async update(
    updateIncidentInput: UpdateIncidentInput,
    user: User,
  ): Promise<Incident> {
    const { assigneeId, id, ...updateIncidentData } = updateIncidentInput;
    permissionGuard(this.db.incident, id, user);

    const updateParams = {
      where: { id },
      data: {
        ...updateIncidentData,
      },
    };

    if (assigneeId) {
      updateParams.data['assignee'] = { connect: { id: assigneeId } };
    }

    return await this.db.incident.update(updateParams);
  }

  async remove(id: string, user: User): Promise<Incident> {
    permissionGuard(this.db.incident, id, user);

    return await this.db.incident.delete({ where: { id } });
  }
}
