import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { IncidentsService } from './incidents.service';
import { CreateIncidentInput, UpdateIncidentInput } from '../graphql';

@Resolver('Incident')
export class IncidentsResolver {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Mutation('createIncident')
  create(
    @Args('createIncidentInput') createIncidentInput: CreateIncidentInput,
    userId: string,
  ) {
    return this.incidentsService.create(createIncidentInput, userId);
  }

  @Query('incidents')
  findAll() {
    return this.incidentsService.findAll();
  }

  @Query('incident')
  findOne(@Args('id') id: string) {
    return this.incidentsService.findOne(id);
  }

  @Mutation('updateIncident')
  update(
    @Args('updateIncidentInput') updateIncidentInput: UpdateIncidentInput,
  ) {
    return this.incidentsService.update(
      updateIncidentInput.id,
      updateIncidentInput,
    );
  }

  @Mutation('removeIncident')
  remove(@Args('id') id: string) {
    return this.incidentsService.remove(id);
  }
}
