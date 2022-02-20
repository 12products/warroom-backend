import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { resolvers, typeDefs } from 'graphql-scalars';
import { join } from 'path/posix';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ServiceGroupsModule } from './service-groups/service-groups.module';
import { ServicesModule } from './services/services.module';
import { IncidentsModule } from './incidents/incidents.module';
import { EventsModule } from './events/events.module';
import { ActionItemsModule } from './action-items/action-items.module';
import { StatusMessagesModule } from './status-messages/status-messages.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { WarroomAuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: WarroomAuthGuard,
    },
  ],
})
export class AppModule {}
