import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { IncidentsService } from './incidents.service';
import { CreateIncidentInput, UpdateIncidentInput } from '../graphql';
import { AuthUser } from '@supabase/supabase-js';
import { CurrentUser } from '../auth/current-user.decorator';
@Resolver('Incident')
export class IncidentsResolver {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Mutation('createIncident')
  create(
    @Args('createIncidentInput') createIncidentInput: CreateIncidentInput,
    @CurrentUser() user: AuthUser,
  ) {
    return this.incidentsService.create(createIncidentInput, user.id);
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
