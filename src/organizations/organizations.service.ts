import { Injectable } from '@nestjs/common';

import { Organization } from '@prisma/client';
import { permissionGuard } from '../auth/permission.guard';
import { DatabaseService } from '../database/database.service';
import {
  UpdateOrganizationInput,
  CreateOrganizationInput,
  User,
} from '../graphql';

@Injectable()
export class OrganizationsService {
  constructor(private readonly db: DatabaseService) {}

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
