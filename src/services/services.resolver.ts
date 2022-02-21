import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ServicesService } from './services.service';
import { CreateServiceInput, UpdateServiceInput, User } from '../graphql';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver('Service')
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Mutation('createService')
  create(
    @Args('createServiceInput') createServiceInput: CreateServiceInput,
    @CurrentUser() user: Partial<User>,
  ) {
    return this.servicesService.create(createServiceInput, user.id);
  }

  @Query('services')
  findAll(@CurrentUser() user: Partial<User>) {
    return this.servicesService.findAll(user);
  }

  @Query('service')
  findOne(@Args('id') id: string, @CurrentUser() user: Partial<User>) {
    return this.servicesService.findOne(id, user);
  }

  @Mutation('updateService')
  update(
    @Args('updateServiceInput') updateServiceInput: UpdateServiceInput,
    @CurrentUser() user: Partial<User>,
  ) {
    return this.servicesService.update(updateServiceInput, user);
  }

  @Mutation('removeService')
  remove(@Args('id') id: string, @CurrentUser() user: Partial<User>) {
    return this.servicesService.remove(id, user);
  }
}
