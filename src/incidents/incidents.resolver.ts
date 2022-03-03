import { IncidentStatus } from './../graphql';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { IncidentsService } from './incidents.service';
import { CreateIncidentInput, UpdateIncidentInput } from '../graphql';
import { User } from '@prisma/client';
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

  @Query('incidentRoomURL')
  findRoomURL(@Args('id') id: string, @CurrentUser() user: User) {
    return this.incidentsService.findRoomURL(id, user);
  }

  @Query('incidentsByServiceId')
  incidentsByServiceId(@Args('serviceId') serviceId: string) {
    return this.incidentsService.findAllByServiceId(serviceId);
  }

  @Query('incidentsByStatus')
  incidentsByStatus(@Args('status') status: IncidentStatus) {
    return this.incidentsService.findAllByStatus(status);
  }

  @Query('assignedIncidents')
  assignedIncidents(@CurrentUser() user: User) {
    return this.incidentsService.findAllByAssignedIncidents(user);
  }

  @Query('openIncidents')
  openIncidents(@CurrentUser() user: User) {
    return this.incidentsService.findAllOpenIncidents(user);
  }

  @Query('incidentEventTime')
  incidentTTD(@Args('id') id: string) {
    return this.incidentsService.findIncidentTime(id);
  }

  @Mutation('updateIncident')
  update(
    @Args('updateIncidentInput') updateIncidentInput: UpdateIncidentInput,
    @CurrentUser() user: User,
  ) {
    return this.incidentsService.update(updateIncidentInput, user);
  }

  @Mutation('removeIncident')
  remove(@Args('id') id: string, @CurrentUser() user: User) {
    return this.incidentsService.remove(id, user);
  }
}
