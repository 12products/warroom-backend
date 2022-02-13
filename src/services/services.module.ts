import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';

@Module({
  providers: [ServicesResolver, ServicesService],
})
export class ServicesModule {}
