import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { IncidentsService } from './incidents.service';
import { IncidentsResolver } from './incidents.resolver';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule, HttpModule],
  providers: [IncidentsResolver, IncidentsService],
})
export class IncidentsModule {}
