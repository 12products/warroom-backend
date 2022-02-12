import { CreateServiceInput } from './create-service.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateServiceInput extends PartialType(CreateServiceInput) {
  id: number;
}
