import { Module } from '@nestjs/common';
import { ServiceGroupsService } from './service-groups.service';
import { ServiceGroupsResolver } from './service-groups.resolver';

@Module({
  providers: [ServiceGroupsResolver, ServiceGroupsService]
})
export class ServiceGroupsModule {}
