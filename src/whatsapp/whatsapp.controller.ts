import { ClientStrategy } from '@/auth/dto/client-strategy';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { getLoggedIn } from '@/decorators/get-logged-in';
// src/whatsapp/whatsapp.controller.ts
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
	constructor(private readonly whatsappService: WhatsappService) {}

	@Post('register')
	@UseGuards(JwtAuthGuard)
	async register(@getLoggedIn() client: ClientStrategy): Promise<{ message: string }> {
		return this.whatsappService.registerPhoneNumber(client.phone);
	}

	@Post('send')
	@UseGuards(JwtAuthGuard)
	async send(@getLoggedIn() client: ClientStrategy, @Body() body: { from: string; message: string }) {
		return this.whatsappService.checkBalance(client, body.from, body.message);
	}

	@Get('qr')
	@UseGuards(JwtAuthGuard)
	async getQr(@getLoggedIn() client: ClientStrategy): Promise<{ message: string; qr: string }> {
		return await this.whatsappService.getQrCode(client.phone);
	}
}
