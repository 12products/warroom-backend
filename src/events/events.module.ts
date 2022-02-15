import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [DatabaseService],
  providers: [EventsResolver, EventsService],
})
export class EventsModule {}
