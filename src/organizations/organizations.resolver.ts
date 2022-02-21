import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { OrganizationsService } from './organizations.service';
import {
  CreateOrganizationInput,
  UpdateOrganizationInput,
  User,
} from '../graphql';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver('Organization')
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Mutation('createOrganization')
  create(
    @Args('createOrganizationInput')
    createOrganizationInput: CreateOrganizationInput,
    @CurrentUser() user: User,
  ) {
    return this.organizationsService.create(createOrganizationInput, user.id);
  }

  @Mutation('updateOrganization')
  update(
    @Args('updateOrganizationInput')
    updateOrganizationInput: UpdateOrganizationInput,
    @CurrentUser() user: User,
  ) {
    return this.organizationsService.update(
      updateOrganizationInput.id,
      updateOrganizationInput,
      user,
    );
  }

  @Mutation('removeOrganization')
  remove(@Args('id') id: string, @CurrentUser() user: User) {
    return this.organizationsService.remove(id, user);
  }
}
