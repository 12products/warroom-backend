import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsResolver } from './incidents.resolver';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [DatabaseService, UsersService],
  providers: [IncidentsResolver, IncidentsService],
})
export class IncidentsModule {}
