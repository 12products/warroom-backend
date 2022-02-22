import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { CreateUserInput, UpdateUserInput } from '../graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '@prisma/client';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  create(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @CurrentUser() user: Partial<User>,
  ) {
    return this.usersService.create(createUserInput, user.id);
  }

  @Query('users')
  findAll(@CurrentUser() user: User) {
    return this.usersService.findAll(user);
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}
