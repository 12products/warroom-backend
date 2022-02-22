import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, lastValueFrom } from 'rxjs';

import { Incident, User } from '@prisma/client';
import { permissionGuard } from '../auth/permission.guard';
import { DatabaseService } from '../database/database.service';
import { CreateIncidentInput, UpdateIncidentInput } from '../graphql';

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
    const { serviceId, assigneeId, ...createIncidentData } =
      createIncidentInput;

    const data = {
      ...createIncidentData,
      organization: { connect: { id: user.organizationId } },
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
    await permissionGuard(this.db.incident, id, user);
    return await this.db.incident.delete({ where: { id } });
  }
}
