import { Injectable } from '@nestjs/common';
import { Organization } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UpdateOrganizationInput, CreateOrganizationInput } from '../graphql';

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

  async findAll(): Promise<Organization[]> {
    return await this.db.organization.findMany();
  }

  async findOne(id: string): Promise<Organization> {
    return await this.db.organization.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateOrganizationInput: UpdateOrganizationInput,
  ): Promise<Organization> {
    return await this.db.organization.update({
      where: { id },
      data: { ...updateOrganizationInput },
    });
  }

  async remove(id: string): Promise<Organization> {
    return await this.db.organization.delete({ where: { id } });
  }
}
