import { CreateIncidentInput } from './create-incident.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateIncidentInput extends PartialType(CreateIncidentInput) {
  id: number;
}
