import { Module } from '@nestjs/common';
import { ServiceGroupsService } from './service-groups.service';
import { ServiceGroupsResolver } from './service-groups.resolver';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [DatabaseService, UsersService],
  providers: [ServiceGroupsResolver, ServiceGroupsService],
})
export class ServiceGroupsModule {}
