import { Injectable } from '@nestjs/common';
import { CreateActionItemInput } from './dto/create-action-item.input';
import { UpdateActionItemInput } from './dto/update-action-item.input';

@Injectable()
export class ActionItemsService {
  create(createActionItemInput: CreateActionItemInput) {
    return 'This action adds a new actionItem';
  }

  findAll() {
    return `This action returns all actionItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actionItem`;
  }

  update(id: number, updateActionItemInput: UpdateActionItemInput) {
    return `This action updates a #${id} actionItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} actionItem`;
  }
}
