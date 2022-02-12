import { Injectable } from '@nestjs/common';
import { CreateStatusMessageInput } from './dto/create-status-message.input';
import { UpdateStatusMessageInput } from './dto/update-status-message.input';

@Injectable()
export class StatusMessagesService {
  create(createStatusMessageInput: CreateStatusMessageInput) {
    return 'This action adds a new statusMessage';
  }

  findAll() {
    return `This action returns all statusMessages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statusMessage`;
  }

  update(id: number, updateStatusMessageInput: UpdateStatusMessageInput) {
    return `This action updates a #${id} statusMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} statusMessage`;
  }
}
