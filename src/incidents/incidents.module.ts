import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsResolver } from './incidents.resolver';

@Module({
  providers: [IncidentsResolver, IncidentsService],
})
export class IncidentsModule {}
