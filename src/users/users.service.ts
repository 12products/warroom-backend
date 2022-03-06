import { Injectable } from '@nestjs/common';

import { CreateUserInput, UpdateUserInput } from '../graphql';
import { Role, User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { InvitesService } from '../invites/invites.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: DatabaseService,
    private readonly invitesService: InvitesService,
  ) {}

  async create(createUserInput: CreateUserInput, id): Promise<User> {
    const data = { ...createUserInput, id };

    // Attach the user to the organization that the invite
    // code belongs to then delete the invite code
    if (data.inviteCode) {
      const invite = await this.invitesService.invite(data.inviteCode);
      data['organization'] = { connect: { id: invite.organizationId } };
      data['role'] = Role.EDITOR;
      delete data.inviteCode;

      const user = await this.db.user.create({ data });

      this.invitesService.remove(invite.id, user);

      return user;
    }

    return await this.db.user.create({ data });
  }

  async findAll(user: User): Promise<User[]> {
    return await this.db.user.findMany({
      where: {
        organization: {
          id: user.organizationId,
        },
      },
      include: {
        organization: true,
      },
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.db.user.findUnique({
      where: {
        id,
      },
      include: {
        organization: true,
      },
    });
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, ...updateUserData } = updateUserInput;
    return await this.db.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserData,
      },
    });
  }

  async remove(id: string): Promise<User> {
    return await this.db.user.delete({
      where: {
        id,
      },
    });
  }
}
