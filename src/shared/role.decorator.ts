import { SetMetadata } from '@nestjs/common';

export const Roles = (...scopes: string[]) => SetMetadata('roles', scopes);
