import { Injectable } from '@nestjs/common';

import { Invite, User } from '@prisma/client';
import { permissionGuard } from '../auth/permission.guard';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class InvitesService {
  constructor(private readonly db: DatabaseService) {}

  async invite(code): Promise<Invite> {
    return await this.db.invite.findFirst({
      where: { code },
      include: { organization: true },
    });
  }

  async create(user: User): Promise<Invite> {
    return await this.db.invite.create({
      data: {
        organization: { connect: { id: user.organizationId } },
      },
    });
  }

  async remove(id: string, user: User): Promise<Invite> {
    await permissionGuard(this.db.invite, id, user);
    return await this.db.invite.delete({ where: { id } });
  }
}
