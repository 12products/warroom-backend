import { Module } from '@nestjs/common';
import { ServiceGroupsService } from './service-groups.service';
import { ServiceGroupsResolver } from './service-groups.resolver';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [ServiceGroupsResolver, ServiceGroupsService],
})
export class ServiceGroupsModule {}
