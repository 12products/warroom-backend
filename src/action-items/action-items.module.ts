import { Module } from '@nestjs/common';
import { ActionItemsService } from './action-items.service';
import { ActionItemsResolver } from './action-items.resolver';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [DatabaseService],
  providers: [ActionItemsResolver, ActionItemsService],
})
export class ActionItemsModule {}
