import { Module } from '@nestjs/common';
import { StatusMessagesService } from './status-messages.service';
import { StatusMessagesResolver } from './status-messages.resolver';

@Module({
  providers: [StatusMessagesResolver, StatusMessagesService]
})
export class StatusMessagesModule {}
