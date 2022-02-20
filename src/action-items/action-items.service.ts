import { Injectable } from '@nestjs/common';
import { ActionItems } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateActionItemInput, UpdateActionItemInput } from '../graphql';

@Injectable()
export class ActionItemsService {
  constructor(private readonly db: DatabaseService) {}
  async create(
    createActionItemInput: CreateActionItemInput,
  ): Promise<ActionItems> {
    const { text, ownerId, incidentId } = createActionItemInput;
    const data = { text };

    if (ownerId) {
      data['owner'] = { connect: { id: ownerId } };
    }

    if (incidentId) {
      data['incident'] = { connect: { id: incidentId } };
    }
    return await this.db.actionItems.create({ data });
  }

  async findAll(): Promise<ActionItems[]> {
    return await this.db.actionItems.findMany();
  }

  async findOne(id: string): Promise<ActionItems> {
    return await this.db.actionItems.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateActionItemInput: UpdateActionItemInput,
  ): Promise<ActionItems> {
    return await this.db.actionItems.update({
      where: { id },
      data: { ...updateActionItemInput },
    });
  }

  async remove(id: string): Promise<ActionItems> {
    return await this.db.actionItems.delete({ where: { id } });
  }
}
