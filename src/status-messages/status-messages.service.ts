import { Injectable } from '@nestjs/common';

import { StatusMessage } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import {
  CreateStatusMessageInput,
  UpdateStatusMessageInput,
  User,
} from '../graphql';
import { permissionGuard } from '../auth/permission.guard';

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

  async findOne(id: string): Promise<StatusMessage> {
    return await this.db.statusMessage.findUnique({
      where: { id },
    });
  }

  async update(
    updateStatusMessageInput: UpdateStatusMessageInput,
    user: User,
  ): Promise<StatusMessage> {
    const { id, ...updateStatusMessageData } = updateStatusMessageInput;

    const statusMessage = await this.findOne(id);
    await permissionGuard(this.db.incident, statusMessage.incidentId, user);

    return await this.db.statusMessage.update({
      where: { id },
      data: {
        ...updateStatusMessageData,
      },
    });
  }

  async remove(id: string, user: User): Promise<StatusMessage> {
    const statusMessage = await this.findOne(id);
    await permissionGuard(this.db.incident, statusMessage.incidentId, user);

    return await this.db.statusMessage.delete({
      where: { id },
    });
  }
}
