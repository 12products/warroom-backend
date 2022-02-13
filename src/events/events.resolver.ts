import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Resolver('Event')
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Mutation('createEvent')
  create(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventsService.create(createEventInput);
  }

  @Query('events')
  findAll() {
    return this.eventsService.findAll();
  }

  @Query('event')
  findOne(@Args('id') id: number) {
    return this.eventsService.findOne(id);
  }

  @Mutation('updateEvent')
  update(@Args('updateEventInput') updateEventInput: UpdateEventInput) {
    return this.eventsService.update(updateEventInput.id, updateEventInput);
  }

  @Mutation('removeEvent')
  remove(@Args('id') id: number) {
    return this.eventsService.remove(id);
  }
}
