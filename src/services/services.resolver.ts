import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';

@Resolver('Service')
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Mutation('createService')
  create(@Args('createServiceInput') createServiceInput: CreateServiceInput) {
    return this.servicesService.create(createServiceInput);
  }

  @Query('services')
  findAll() {
    return this.servicesService.findAll();
  }

  @Query('service')
  findOne(@Args('id') id: number) {
    return this.servicesService.findOne(id);
  }

  @Mutation('updateService')
  update(@Args('updateServiceInput') updateServiceInput: UpdateServiceInput) {
    return this.servicesService.update(updateServiceInput.id, updateServiceInput);
  }

  @Mutation('removeService')
  remove(@Args('id') id: number) {
    return this.servicesService.remove(id);
  }
}
