import { Module } from '@nestjs/common';

import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [ServicesResolver, ServicesService],
})
export class ServicesModule {}
