import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { IncidentsService } from './incidents.service';
import { CreateIncidentInput, UpdateIncidentInput, User } from '../graphql';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver('Incident')
export class IncidentsResolver {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Mutation('createIncident')
  create(
    @Args('createIncidentInput') createIncidentInput: CreateIncidentInput,
    @CurrentUser() user: User,
  ) {
    return this.incidentsService.create(createIncidentInput, user);
  }

  @Query('incidents')
  findAll(@CurrentUser() user: User) {
    return this.incidentsService.findAll(user);
  }

  @Query('incident')
  findOne(@Args('id') id: string, @CurrentUser() user: User) {
    return this.incidentsService.findOne(id, user);
  }

  @Mutation('updateIncident')
  update(
    @Args('updateIncidentInput') updateIncidentInput: UpdateIncidentInput,
    @CurrentUser() user: User,
  ) {
    return this.incidentsService.update(
      updateIncidentInput.id,
      updateIncidentInput,
      user,
    );
  }

  @Mutation('removeIncident')
  remove(@Args('id') id: string, @CurrentUser() user: User) {
    return this.incidentsService.remove(id, user);
  }
}
