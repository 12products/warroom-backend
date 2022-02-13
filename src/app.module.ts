import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { resolvers, typeDefs } from 'graphql-scalars';
import { join } from 'path/posix';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ServiceGroupsModule } from './service-groups/service-groups.module';
import { ServicesModule } from './services/services.module';
import { IncidentsModule } from './incidents/incidents.module';
import { EventsModule } from './events/events.module';
import { ActionItemsModule } from './action-items/action-items.module';
import { StatusMessagesModule } from './status-messages/status-messages.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolvers: {
        ...resolvers,
      },
      typeDefs: [...typeDefs],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    DatabaseModule,
    UsersModule,
    OrganizationsModule,
    ServiceGroupsModule,
    ServicesModule,
    IncidentsModule,
    EventsModule,
    ActionItemsModule,
    StatusMessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
