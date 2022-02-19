import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { CreateServiceInput, UpdateServiceInput } from '../graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { AuthUser } from '@supabase/supabase-js';

@Resolver('Service')
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Mutation('createService')
  create(
    @Args('createServiceInput') createServiceInput: CreateServiceInput,
    @CurrentUser() user: AuthUser,
  ) {
    return this.servicesService.create(createServiceInput, user.id);
  }

  @Query('services')
  findAll() {
    return this.servicesService.findAll();
  }

  @Query('service')
  findOne(@Args('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Mutation('updateService')
  update(@Args('updateServiceInput') updateServiceInput: UpdateServiceInput) {
    return this.servicesService.update(updateServiceInput);
  }

  @Mutation('removeService')
  remove(@Args('id') id: string) {
    return this.servicesService.remove(id);
  }
}
