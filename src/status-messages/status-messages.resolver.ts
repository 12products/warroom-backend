import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { StatusMessagesService } from './status-messages.service';
import { CreateStatusMessageInput, UpdateStatusMessageInput } from '../graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '@prisma/client';

@Resolver('StatusMessage')
export class StatusMessagesResolver {
  constructor(private readonly statusMessagesService: StatusMessagesService) {}

  @Mutation('createStatusMessage')
  create(
    @Args('createStatusMessageInput')
    createStatusMessageInput: CreateStatusMessageInput,
  ) {
    return this.statusMessagesService.create(createStatusMessageInput);
  }

  @Mutation('updateStatusMessage')
  update(
    @Args('updateStatusMessageInput')
    updateStatusMessageInput: UpdateStatusMessageInput,
    @CurrentUser() user: User,
  ) {
    return this.statusMessagesService.update(updateStatusMessageInput, user);
  }

  @Mutation('removeStatusMessage')
  remove(@Args('id') id: string, @CurrentUser() user: User) {
    return this.statusMessagesService.remove(id, user);
  }
}
