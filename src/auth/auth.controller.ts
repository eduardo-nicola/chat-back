// auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BodyLoginDto } from './dto/body-login';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() body: BodyLoginDto) {
		const client = await this.authService.validateClient(body.document, body.password);
		return this.authService.login(client);
	}
}
