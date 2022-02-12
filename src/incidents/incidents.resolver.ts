import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { IncidentsService } from './incidents.service';
import { CreateIncidentInput } from './dto/create-incident.input';
import { UpdateIncidentInput } from './dto/update-incident.input';

@Resolver('Incident')
export class IncidentsResolver {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Mutation('createIncident')
  create(@Args('createIncidentInput') createIncidentInput: CreateIncidentInput) {
    return this.incidentsService.create(createIncidentInput);
  }

  @Query('incidents')
  findAll() {
    return this.incidentsService.findAll();
  }

  @Query('incident')
  findOne(@Args('id') id: number) {
    return this.incidentsService.findOne(id);
  }

  @Mutation('updateIncident')
  update(@Args('updateIncidentInput') updateIncidentInput: UpdateIncidentInput) {
    return this.incidentsService.update(updateIncidentInput.id, updateIncidentInput);
  }

  @Mutation('removeIncident')
  remove(@Args('id') id: number) {
    return this.incidentsService.remove(id);
  }
}
