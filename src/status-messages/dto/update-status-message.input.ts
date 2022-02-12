import { CreateStatusMessageInput } from './create-status-message.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateStatusMessageInput extends PartialType(CreateStatusMessageInput) {
  id: number;
}
