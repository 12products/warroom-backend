import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StatusMessagesService } from './status-messages.service';
import { CreateStatusMessageInput } from './dto/create-status-message.input';
import { UpdateStatusMessageInput } from './dto/update-status-message.input';

@Resolver('StatusMessage')
export class StatusMessagesResolver {
  constructor(private readonly statusMessagesService: StatusMessagesService) {}

  @Mutation('createStatusMessage')
  create(@Args('createStatusMessageInput') createStatusMessageInput: CreateStatusMessageInput) {
    return this.statusMessagesService.create(createStatusMessageInput);
  }

  @Query('statusMessages')
  findAll() {
    return this.statusMessagesService.findAll();
  }

  @Query('statusMessage')
  findOne(@Args('id') id: number) {
    return this.statusMessagesService.findOne(id);
  }

  @Mutation('updateStatusMessage')
  update(@Args('updateStatusMessageInput') updateStatusMessageInput: UpdateStatusMessageInput) {
    return this.statusMessagesService.update(updateStatusMessageInput.id, updateStatusMessageInput);
  }

  @Mutation('removeStatusMessage')
  remove(@Args('id') id: number) {
    return this.statusMessagesService.remove(id);
  }
}
