import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';
import { DatabaseService } from '../database/database.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [DatabaseService, UsersService],
  providers: [ServicesResolver, ServicesService],
})
export class ServicesModule {}
