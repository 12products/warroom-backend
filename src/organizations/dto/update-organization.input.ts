import { CreateOrganizationInput } from './create-organization.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateOrganizationInput extends PartialType(CreateOrganizationInput) {
  id: number;
}
