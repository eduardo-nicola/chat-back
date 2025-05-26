import { PrismaService } from '@/prisma/prisma.service';
import { handlePrisma } from '@/shered/handle-prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
	constructor(private readonly prismaService: PrismaService) {}

	async createMessage(message: string, clientId: string, fromPhone: string, chatId: string, senderIsMy: boolean) {
		handlePrisma(async () => {
			await this.prismaService.message.create({
				data: {
					message: message,
					status: 'SENT',
					clientId,
					fromPhone: fromPhone,
					chatId: chatId,
					senderIsMy: senderIsMy,
				},
			});
		});
	}

	async getMessagesForChat(chatId: string, clientId: string) {
		return handlePrisma(async () => {
			return this.prismaService.message.findMany({
				where: { chatId: chatId, clientId: clientId },
				omit: { createdAt: true, updatedAt: true, status: true },
			});
		});
	}
}
