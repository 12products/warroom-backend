import { Module } from '@nestjs/common';
import { ActionItemsService } from './action-items.service';
import { ActionItemsResolver } from './action-items.resolver';

@Module({
  providers: [ActionItemsResolver, ActionItemsService],
})
export class ActionItemsModule {}
