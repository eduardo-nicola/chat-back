import { PrismaService } from '@/prisma/prisma.service';
import { handlePrisma } from '@/shered/handle-prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
	constructor(private readonly prismaService: PrismaService) {}

	async createMessage(message: string, clientId: string, fromPhone: string, chatId: string) {
		handlePrisma(async () => {
			this.prismaService.message.create({
				data: { message, status: 'SENT', clientId, fromPhone, chatId: chatId },
			});
		});
	}
}
