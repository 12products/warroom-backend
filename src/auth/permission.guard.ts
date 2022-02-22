import { UnauthorizedException } from '@nestjs/common';

import { User } from '@prisma/client';

export const permissionGuard = async (db: any, id: string, user: User) => {
  const resource = await db.findUnique({
    where: { id },
  });

  if (resource.organizationId !== user.organizationId) {
    throw new UnauthorizedException();
  }

  return resource;
};
