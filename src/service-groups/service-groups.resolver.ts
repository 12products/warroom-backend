import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ServiceGroupsService } from './service-groups.service';
import { CreateServiceGroupInput, UpdateServiceGroupInput } from '../graphql';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver('ServiceGroup')
export class ServiceGroupsResolver {
  constructor(private readonly serviceGroupsService: ServiceGroupsService) {}

  @Mutation('createServiceGroup')
  create(
    @Args('createServiceGroupInput')
    createServiceGroupInput: CreateServiceGroupInput,
    @CurrentUser() user: User,
  ) {
    return this.serviceGroupsService.create(createServiceGroupInput, user);
  }

  @Query('serviceGroups')
  findAll() {
    return this.serviceGroupsService.findAll();
  }

  @Query('serviceGroup')
  findOne(@Args('id') id: string) {
    return this.serviceGroupsService.findOne(id);
  }

  @Mutation('updateServiceGroup')
  update(
    @Args('updateServiceGroupInput')
    updateServiceGroupInput: UpdateServiceGroupInput,
  ) {
    return this.serviceGroupsService.update(updateServiceGroupInput);
  }

  @Mutation('removeServiceGroup')
  remove(@Args('id') id: string) {
    return this.serviceGroupsService.remove(id);
  }
}
