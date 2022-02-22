import { UnauthorizedException } from '@nestjs/common';

import { User } from '../graphql';

export const permissionGuard = async (db: any, id: string, user: User) => {
  const resource = await db.findUnique({
    where: { id },
  });

  if (resource.organizationId !== user.organization.id) {
    throw new UnauthorizedException();
  }

  return resource;
};
