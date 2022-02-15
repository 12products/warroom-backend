import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsResolver } from './organizations.resolver';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [DatabaseService],
  providers: [OrganizationsResolver, OrganizationsService],
})
export class OrganizationsModule {}
