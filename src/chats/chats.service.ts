import { ClientStrategy } from '@/auth/dto/client-strategy';
import { PrismaService } from '@/prisma/prisma.service';
import { handlePrisma } from '@/shered/handle-prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatsService {
	constructor(private readonly prisma: PrismaService) {}

	async getChats(client: ClientStrategy) {
		return handlePrisma(async () => {
			return await this.prisma.chats.findMany({ where: { clientId: client.clientId } });
		});
	}

	async findChat(wpId: string) {
		return handlePrisma(async () => {
			return this.prisma.chats.findUnique({ where: { wpId: wpId }, select: { id: true } });
		});
	}

	async createNewChat(clientId: string, fromPhone: string, wpId: string, fromName?: string) {
		return handlePrisma(async () => {
			return await this.prisma.chats.create({
				data: { wpId: wpId, fromPhone: fromPhone, fromName: fromName, clientId: clientId },
			});
		});
	}

	async updateChatFromName(wpId: string, fromName: string, avatar?: string) {
		const chat = await handlePrisma(async () => {
			return await this.prisma.chats.findUnique({ where: { wpId: wpId }, select: { avatar: true, fromName: true } });
		});

		if (chat?.avatar && chat.fromName) return;

		return await handlePrisma(async () => {
			await this.prisma.chats.update({ where: { wpId: wpId }, data: { fromName: fromName, avatar: avatar } });
		});
	}
}
