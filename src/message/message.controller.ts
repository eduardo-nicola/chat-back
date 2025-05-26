import { ClientStrategy } from '@/auth/dto/client-strategy';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { getLoggedIn } from '@/decorators/get-logged-in';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@Get(':idChat')
	@UseGuards(JwtAuthGuard)
	async getMessages(@Param('idChat') idChat: string, @getLoggedIn() client: ClientStrategy) {
		return this.messageService.getMessagesForChat(idChat, client.clientId);
	}
}
