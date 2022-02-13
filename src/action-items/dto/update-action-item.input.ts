import { CreateActionItemInput } from './create-action-item.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateActionItemInput extends PartialType(CreateActionItemInput) {
  id: number;
}
