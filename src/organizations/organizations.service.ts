import { Injectable } from '@nestjs/common';
import { sub } from 'date-fns';

import { Organization, User } from '@prisma/client';
import { permissionGuard } from '../auth/permission.guard';
import { DatabaseService } from '../database/database.service';
import { UpdateOrganizationInput, CreateOrganizationInput } from '../graphql';

@Injectable()
export class OrganizationsService {
  constructor(private readonly db: DatabaseService) {}

  async status(id: string): Promise<Organization> {
    // Get the organization, all of its services
    // and 60 days worth of incidents
    return await this.db.organization.findUnique({
      where: { id },
      include: {
        services: {
          include: {
            incidents: {
              where: { incidentDate: { gte: sub(new Date(), { days: 60 }) } },
            },
          },
        },
      },
    });
  }

  async create(
    createOrganizationInput: CreateOrganizationInput,
    userId: string,
  ): Promise<Organization> {
    return await this.db.organization.create({
      data: { ...createOrganizationInput, users: { connect: { id: userId } } },
    });
  }

  async update(
    id: string,
    updateOrganizationInput: UpdateOrganizationInput,
    user: User,
  ): Promise<Organization> {
    await permissionGuard(this.db.organization, id, user);
    return await this.db.organization.update({
      where: { id },
      data: { ...updateOrganizationInput },
    });
  }

  async remove(id: string, user: User): Promise<Organization> {
    await permissionGuard(this.db.organization, id, user);
    return await this.db.organization.delete({ where: { id } });
  }
}
