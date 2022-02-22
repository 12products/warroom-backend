import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, lastValueFrom } from 'rxjs';

import { Incident } from '@prisma/client';
import { permissionGuard } from '../auth/permission.guard';
import { DatabaseService } from '../database/database.service';
import { CreateIncidentInput, UpdateIncidentInput, User } from '../graphql';

@Injectable()
export class IncidentsService {
  constructor(
    private readonly db: DatabaseService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
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
    return await permissionGuard(this.db.incident, id, user);
  }

  async findRoomURL(id: string, user: User): Promise<Incident> {
    let { roomURL } = await permissionGuard(this.db.incident, id, user);

    // Create a room on Daily if required
    if (!roomURL) {
      try {
        const dailyRequest = await this.httpService
          .post('https://api.daily.co/v1/rooms/', null, {
            headers: {
              Authorization: `Bearer ${this.configService.get<string>(
                'DAILY_KEY',
              )}`,
            },
          })
          .pipe(map(({ data }) => data));
        const { url } = await lastValueFrom(dailyRequest);

        roomURL = url;

        // Save the URL to the database
        await this.update(id, { id, roomURL }, user);
      } catch (e) {
        console.error(`Failed to create room for incident (${id}): ${e}`);
      }
    }

    return roomURL;
  }

  async update(
    id: string,
    updateIncidentInput: UpdateIncidentInput,
    user: User,
  ): Promise<Incident> {
    await permissionGuard(this.db.incident, id, user);
    return await this.db.incident.update({
      where: { id },
      data: { ...updateIncidentInput },
    });
  }

  async remove(id: string, user: User): Promise<Incident> {
    await permissionGuard(this.db.incident, id, user);
    return await this.db.incident.delete({ where: { id } });
  }
}
