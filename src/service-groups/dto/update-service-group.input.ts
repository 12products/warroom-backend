import { CreateServiceGroupInput } from './create-service-group.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateServiceGroupInput extends PartialType(CreateServiceGroupInput) {
  id: number;
}
