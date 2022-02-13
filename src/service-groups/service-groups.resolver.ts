import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ServiceGroupsService } from './service-groups.service';
import { CreateServiceGroupInput } from './dto/create-service-group.input';
import { UpdateServiceGroupInput } from './dto/update-service-group.input';

@Resolver('ServiceGroup')
export class ServiceGroupsResolver {
  constructor(private readonly serviceGroupsService: ServiceGroupsService) {}

  @Mutation('createServiceGroup')
  create(@Args('createServiceGroupInput') createServiceGroupInput: CreateServiceGroupInput) {
    return this.serviceGroupsService.create(createServiceGroupInput);
  }

  @Query('serviceGroups')
  findAll() {
    return this.serviceGroupsService.findAll();
  }

  @Query('serviceGroup')
  findOne(@Args('id') id: number) {
    return this.serviceGroupsService.findOne(id);
  }

  @Mutation('updateServiceGroup')
  update(@Args('updateServiceGroupInput') updateServiceGroupInput: UpdateServiceGroupInput) {
    return this.serviceGroupsService.update(updateServiceGroupInput.id, updateServiceGroupInput);
  }

  @Mutation('removeServiceGroup')
  remove(@Args('id') id: number) {
    return this.serviceGroupsService.remove(id);
  }
}
