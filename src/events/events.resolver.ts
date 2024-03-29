import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { CreateEventInput, UpdateEventInput } from '../graphql';

@Resolver('Event')
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Mutation('createEvent')
  create(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventsService.create(createEventInput);
  }

  @Mutation('updateEvent')
  update(@Args('updateEventInput') updateEventInput: UpdateEventInput) {
    return this.eventsService.update(updateEventInput.id, updateEventInput);
  }

  @Mutation('removeEvent')
  remove(@Args('id') id: string) {
    return this.eventsService.remove(id);
  }
}
