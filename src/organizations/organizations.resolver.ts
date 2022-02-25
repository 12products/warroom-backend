import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { OrganizationsService } from './organizations.service';
import { CreateOrganizationInput, UpdateOrganizationInput } from '../graphql';

import { User } from '@prisma/client';
import { CurrentUser } from '../auth/current-user.decorator';
import { Public } from 'src/auth/public.decorator';

@Resolver('Organization')
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Public()
  @Query('organizationStatus')
  organizationStatus(@Args('id') id: string) {
    return this.organizationsService.status(id);
  }

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
