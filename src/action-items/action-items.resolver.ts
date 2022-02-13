import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ActionItemsService } from './action-items.service';
import { CreateActionItemInput } from './dto/create-action-item.input';
import { UpdateActionItemInput } from './dto/update-action-item.input';

@Resolver('ActionItem')
export class ActionItemsResolver {
  constructor(private readonly actionItemsService: ActionItemsService) {}

  @Mutation('createActionItem')
  create(@Args('createActionItemInput') createActionItemInput: CreateActionItemInput) {
    return this.actionItemsService.create(createActionItemInput);
  }

  @Query('actionItems')
  findAll() {
    return this.actionItemsService.findAll();
  }

  @Query('actionItem')
  findOne(@Args('id') id: number) {
    return this.actionItemsService.findOne(id);
  }

  @Mutation('updateActionItem')
  update(@Args('updateActionItemInput') updateActionItemInput: UpdateActionItemInput) {
    return this.actionItemsService.update(updateActionItemInput.id, updateActionItemInput);
  }

  @Mutation('removeActionItem')
  remove(@Args('id') id: number) {
    return this.actionItemsService.remove(id);
  }
}
