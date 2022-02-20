import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsResolver } from './incidents.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [IncidentsResolver, IncidentsService],
})
export class IncidentsModule {}
