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

	async findChat(fromPhone: string) {
		return handlePrisma(async () => {
			return this.prisma.chats.findUnique({ where: { fromPhone: fromPhone }, select: { id: true } });
		});
	}

	async createNewChat(clientId: string, fromPhone: string, fromName?: string) {
		return handlePrisma(async () => {
			return await this.prisma.chats.create({ data: { fromPhone: fromPhone, fromName: fromName, clientId: clientId } });
		});
	}

	async updateChatFromName(fromPhone: string, fromName: string) {
		handlePrisma(async () => {
			this.prisma.chats.update({ where: { fromPhone: fromPhone }, data: { fromName: fromName } });
		});
	}
}
