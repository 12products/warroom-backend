import { Injectable } from '@nestjs/common';
import { StatusMessage } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateStatusMessageInput, UpdateStatusMessageInput } from '../graphql';

@Injectable()
export class StatusMessagesService {
  constructor(private readonly db: DatabaseService) {}
  async create(
    createStatusMessageInput: CreateStatusMessageInput,
  ): Promise<StatusMessage> {
    const { incidentId, ...createStatusMessageData } = createStatusMessageInput;
    return await this.db.statusMessage.create({
      data: {
        ...createStatusMessageData,
        incident: {
          connect: { id: incidentId },
        },
      },
    });
  }

  async findAll(): Promise<StatusMessage[]> {
    return await this.db.statusMessage.findMany();
  }

  async findOne(id: string): Promise<StatusMessage> {
    return await this.db.statusMessage.findUnique({
      where: { id },
    });
  }

  async update(
    updateStatusMessageInput: UpdateStatusMessageInput,
  ): Promise<StatusMessage> {
    const { id, ...updateStatusMessageData } = updateStatusMessageInput;
    return await this.db.statusMessage.update({
      where: { id },
      data: {
        ...updateStatusMessageData,
      },
    });
  }

  async remove(id: string): Promise<StatusMessage> {
    return await this.db.statusMessage.delete({
      where: { id },
    });
  }
}
