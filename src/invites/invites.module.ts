import { Module } from '@nestjs/common';

import { InvitesService } from './invites.service';
import { InvitesResolver } from './invites.resolver';
import { DatabaseModule } from '../database/database.module';
@Module({
  exports: [InvitesService],
  imports: [DatabaseModule],
  providers: [InvitesResolver, InvitesService],
})
export class InvitesModule {}
