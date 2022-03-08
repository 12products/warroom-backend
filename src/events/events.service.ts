import { Injectable } from '@nestjs/common';
import { Event, EventType } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreateEventInput, UpdateEventInput } from '../graphql';

@Injectable()
export class EventsService {
  constructor(private readonly db: DatabaseService) {}
  async create(createEventInput: CreateEventInput): Promise<Event> {
    const { incidentId, text, type, eventDate } = createEventInput;
    const data = { text, eventDate };

    if (incidentId) {
      data['incident'] = { connect: { id: incidentId } };

      if (!(await this.incidentHasEventType(incidentId, type))) {
        data['type'] = type;
      }
    }

    return await this.db.event.create({ data });
  }

  async update(id: string, updateEventInput: UpdateEventInput): Promise<Event> {
    return await this.db.event.update({
      where: { id },
      data: { ...updateEventInput },
    });
  }

  async remove(id: string): Promise<Event> {
    return await this.db.event.delete({ where: { id } });
  }

  async incidentHasEventType(
    incidentId: string,
    type?: EventType,
  ): Promise<boolean> {
    if (!type) return true;

    const incident = await this.db.incident.findUnique({
      where: { id: incidentId },
      include: { events: true },
    });

    return incident.events.some((event) => event.type === type);
  }
}
