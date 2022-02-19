import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsResolver } from './organizations.resolver';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [OrganizationsResolver, OrganizationsService],
})
export class OrganizationsModule {}
