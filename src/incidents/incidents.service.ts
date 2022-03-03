import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, lastValueFrom } from 'rxjs';
import { differenceInMinutes, differenceInHours } from 'date-fns';

import {
  Incident,
  User,
  IncidentStatus,
  EventType,
  Event,
} from '@prisma/client';
import { permissionGuard } from '../auth/permission.guard';
import { DatabaseService } from '../database/database.service';
import {
  CreateIncidentInput,
  IncidentTime,
  UpdateIncidentInput,
} from '../graphql';

const calculateTimeDifferenceString = (
  earlierEvent: Event,
  laterEvent: Event,
): string => {
  if (!earlierEvent || !laterEvent) return '?';
  let minutes = true;
  let timeDiff = differenceInMinutes(
    new Date(laterEvent.createdAt),
    new Date(earlierEvent.createdAt),
  );

  if (timeDiff > 60) {
    timeDiff = differenceInHours(
      new Date(laterEvent.createdAt),
      new Date(earlierEvent.createdAt),
    );
    minutes = false;
  }

  return minutes ? `${timeDiff} minutes` : `${timeDiff} hours`;
};

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

    const service = await this.db.service.findUnique({
      where: { id: serviceId },
    });

    const updatedIncidentNum = service.incidentNumber + 1;
    const tag = `${service.name
      .slice(0, 3)
      .toUpperCase()}-${updatedIncidentNum}`;

    await this.db.service.update({
      where: { id: serviceId },
      data: { incidentNumber: updatedIncidentNum },
    });

    const data = {
      ...createIncidentData,
      tag,
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
        statusMessage: {
          orderBy: {
            createdAt: 'desc',
          },
        },
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
          .post(
            'https://api.daily.co/v1/rooms/',
            {
              properties: {
                enable_chat: true,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${this.configService.get<string>(
                  'DAILY_KEY',
                )}`,
              },
            },
          )
          .pipe(map(({ data }) => data));
        const { url } = await lastValueFrom(dailyRequest);

        roomURL = url;

        // Save the URL to the database
        await this.update({ id, roomURL }, user);
      } catch (e) {
        console.error(`Failed to create room for incident (${id}): ${e}`);
      }
    }

    return roomURL;
  }

  async findAllByServiceId(id: string): Promise<Incident[]> {
    return await this.db.incident.findMany({
      where: { serviceId: id },
    });
  }

  async findAllByAssignedIncidents(user: User): Promise<Incident[]> {
    return await this.db.incident.findMany({
      where: { assigneeId: user.id },
    });
  }

  async findAllOpenIncidents(user: User): Promise<Incident[]> {
    return await this.db.incident.findMany({
      where: {
        organizationId: user.organizationId,
        NOT: {
          status: IncidentStatus.RESOLVED,
        },
      },
    });
  }

  async findIncidentTime(id: string): Promise<IncidentTime> {
    const { events } = await this.db.incident.findUnique({
      where: { id },
      include: {
        events: true,
      },
    });

    const causeEvent = events.find((event) => event.type === EventType.CAUSE);
    const detectionEvent = events.find(
      (event) => event.type === EventType.DETECTION,
    );
    const resolutionEvent = events.find(
      (event) => event.type === EventType.RESOLUTION,
    );

    const TTD = calculateTimeDifferenceString(causeEvent, detectionEvent);
    const TTR = calculateTimeDifferenceString(detectionEvent, resolutionEvent);
    return { TTD, TTR };
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
