import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateEventInput, UpdateEventInput } from '../graphql';

@Injectable()
export class EventsService {
  constructor(private readonly db: DatabaseService) {}
  async create(createEventInput: CreateEventInput): Promise<Event> {
    const { incidentId, text } = createEventInput;
    const data = { text };
    if (incidentId) {
      data['incident'] = { connect: { id: incidentId } };
    }
    return this.db.event.create({ data });
  }

  async findAll(): Promise<Event[]> {
    return this.db.event.findMany();
  }

  async findOne(id: string): Promise<Event> {
    return this.db.event.findUnique({ where: { id } });
  }

  async update(id: string, updateEventInput: UpdateEventInput): Promise<Event> {
    return this.db.event.update({
      where: { id },
      data: { ...updateEventInput },
    });
  }

  async remove(id: string): Promise<Event> {
    return this.db.event.delete({ where: { id } });
  }
}
