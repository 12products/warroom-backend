import { Injectable } from '@nestjs/common';
import { CreateServiceGroupInput } from './dto/create-service-group.input';
import { UpdateServiceGroupInput } from './dto/update-service-group.input';

@Injectable()
export class ServiceGroupsService {
  create(createServiceGroupInput: CreateServiceGroupInput) {
    return 'This action adds a new serviceGroup';
  }

  findAll() {
    return `This action returns all serviceGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceGroup`;
  }

  update(id: number, updateServiceGroupInput: UpdateServiceGroupInput) {
    return `This action updates a #${id} serviceGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceGroup`;
  }
}
