import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getLoggedIn = createParamDecorator((_data: any, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	const user = request.user;
	return user;
});
