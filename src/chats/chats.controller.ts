import { ClientStrategy } from '@/auth/dto/client-strategy';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { getLoggedIn } from '@/decorators/get-logged-in';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
	constructor(private readonly chatsService: ChatsService) {}

	@Get('')
	@UseGuards(JwtAuthGuard)
	async getChasts(@getLoggedIn() client: ClientStrategy) {
		return this.chatsService.getChats(client);
	}
}
