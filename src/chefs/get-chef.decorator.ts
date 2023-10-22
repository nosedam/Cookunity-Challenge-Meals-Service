import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Chef } from './entities/chef.entity';

export const GetChef = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as Chef;
  },
);
