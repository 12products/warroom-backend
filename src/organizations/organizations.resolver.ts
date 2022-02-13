import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';

@Resolver('Organization')
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Mutation('createOrganization')
  create(@Args('createOrganizationInput') createOrganizationInput: CreateOrganizationInput) {
    return this.organizationsService.create(createOrganizationInput);
  }

  @Query('organizations')
  findAll() {
    return this.organizationsService.findAll();
  }

  @Query('organization')
  findOne(@Args('id') id: number) {
    return this.organizationsService.findOne(id);
  }

  @Mutation('updateOrganization')
  update(@Args('updateOrganizationInput') updateOrganizationInput: UpdateOrganizationInput) {
    return this.organizationsService.update(updateOrganizationInput.id, updateOrganizationInput);
  }

  @Mutation('removeOrganization')
  remove(@Args('id') id: number) {
    return this.organizationsService.remove(id);
  }
}
