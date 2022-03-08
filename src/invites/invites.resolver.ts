import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { InvitesService } from './invites.service';

import { User } from '@prisma/client';
import { CurrentUser } from '../auth/current-user.decorator';
import { Public } from '../auth/public.decorator';

@Resolver('Invite')
export class InvitesResolver {
  constructor(private readonly invitesService: InvitesService) {}

  @Public()
  @Query('invite')
  invite(@Args('code') code: string) {
    return this.invitesService.invite(code);
  }

  @Mutation('createInvite')
  create(@CurrentUser() user: User) {
    return this.invitesService.create(user);
  }

  @Mutation('removeInvite')
  remove(@Args('id') id: string, @CurrentUser() user: User) {
    return this.invitesService.remove(id, user);
  }
}
