import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationInput, UpdateOrganizationInput } from '../graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthUser } from '@supabase/supabase-js';

@Resolver('Organization')
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Mutation('createOrganization')
  create(
    @Args('createOrganizationInput')
    createOrganizationInput: CreateOrganizationInput,
    @CurrentUser() user: AuthUser,
  ) {
    return this.organizationsService.create(createOrganizationInput, user.id);
  }

  @Query('organizations')
  findAll() {
    return this.organizationsService.findAll();
  }

  @Query('organization')
  findOne(@Args('id') id: string) {
    return this.organizationsService.findOne(id);
  }

  @Mutation('updateOrganization')
  update(
    @Args('updateOrganizationInput')
    updateOrganizationInput: UpdateOrganizationInput,
  ) {
    return this.organizationsService.update(
      updateOrganizationInput.id,
      updateOrganizationInput,
    );
  }

  @Mutation('removeOrganization')
  remove(@Args('id') id: string) {
    return this.organizationsService.remove(id);
  }
}
