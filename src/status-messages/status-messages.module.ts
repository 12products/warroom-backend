import { Module } from '@nestjs/common';
import { StatusMessagesService } from './status-messages.service';
import { StatusMessagesResolver } from './status-messages.resolver';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [StatusMessagesResolver, StatusMessagesService],
})
export class StatusMessagesModule {}
