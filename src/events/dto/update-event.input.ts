import { CreateEventInput } from './create-event.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEventInput extends PartialType(CreateEventInput) {
  id: number;
}
