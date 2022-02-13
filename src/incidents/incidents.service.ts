import { Injectable } from '@nestjs/common';
import { CreateIncidentInput } from './dto/create-incident.input';
import { UpdateIncidentInput } from './dto/update-incident.input';

@Injectable()
export class IncidentsService {
  create(createIncidentInput: CreateIncidentInput) {
    return 'This action adds a new incident';
  }

  findAll() {
    return `This action returns all incidents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incident`;
  }

  update(id: number, updateIncidentInput: UpdateIncidentInput) {
    return `This action updates a #${id} incident`;
  }

  remove(id: number) {
    return `This action removes a #${id} incident`;
  }
}
