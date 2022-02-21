import { Module } from '@nestjs/common';
import { ActionItemsService } from './action-items.service';
import { ActionItemsResolver } from './action-items.resolver';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [ActionItemsResolver, ActionItemsService],
})
export class ActionItemsModule {}
