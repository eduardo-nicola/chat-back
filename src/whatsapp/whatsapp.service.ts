import * as path from 'node:path';
import { ClientStrategy } from '@/auth/dto/client-strategy';
import { ChatsService } from '@/chats/chats.service';
import { ClientsService } from '@/clients/clients.service';
import { MessageService } from '@/message/message.service';
import { handlePrisma } from '@/shered/handle-prisma';
import {
	Injectable,
	Logger,
	NotFoundException,
	UnauthorizedException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { CreateConfig, Message, Whatsapp, create } from 'venom-bot';

@Injectable()
export class WhatsappService {
	private readonly logger = new Logger(WhatsappService.name);
	private clients: Map<string, Whatsapp> = new Map();
	private qrcodes: Map<string, string> = new Map();

	constructor(
		private readonly messageService: MessageService,
		private readonly clientService: ClientsService,
		private readonly chatService: ChatsService,
	) {}

	private getSessionFolder(phone: string): string {
		return path.resolve(__dirname, 'sessions', phone);
	}

	private async seveMessage(fromPhone: string, message: string, clientId: string) {
		const ids: { exist: false | string; new: string } = { exist: false, new: '' };
		const chat = await this.chatService.findChat(clientId);
		ids.exist = chat?.id ?? false;

		if (!chat) {
			const chatCreated = await this.chatService.createNewChat(clientId, fromPhone);
			ids.new = chatCreated.id;
		}

		const chatId = ids.exist ? ids.exist : ids.new;

		this.messageService.createMessage(message, clientId, fromPhone, chatId);
	}

	private async sendMessage(fromPhone: string, to: string, message: string, clientId: string) {
		const client = this.clients.get(fromPhone);
		if (!client) throw new UnauthorizedException('Número não está conectado');
		const send = await client.sendText(`${to}@c.us`, message);

		if (send) {
			this.seveMessage(fromPhone, message, clientId);
		}

		return { message: 'Mensagem enviado com sucesso' };
	}

	async registerPhoneNumber(phone: string): Promise<{ message: string }> {
		const sessionFolder = this.getSessionFolder(phone);
		const options: CreateConfig = {
			browserArgs: ['--no-sandbox', '--disable-setuid-sandbox', '--remote-debugging-port=9222'],
			folderNameToken: sessionFolder,
			disableWelcome: true,
			mkdirFolderToken: sessionFolder,
			headless: 'old',
			logQR: true,
		};
		create(
			phone,
			(base64Qrimg, _asciiQR, attempts, _urlCode) => {
				this.logger.log(`[${phone}] QR gerado (tentativa ${attempts})`);
				this.qrcodes.set(phone, base64Qrimg);
			},
			undefined,
			options,
		)
			.then((client) => {
				client.onStateChange((state) => {
					this.logger.log(`Estado da sessão ${phone}: ${state}`);
				});
				client.onMessage((message: Message) => {
					this.chatService.updateChatFromName(message.from, message.chat.name);
					this.logger.log(`[${phone}] Mensagem de ${message.from}:`, message);
				});
				this.clients.set(phone, client);
			})
			.catch((err) => {
				this.logger.error(`Erro ao criar sessão ${phone}:`, err);
			});

		return { message: 'Aguardando Qr Code' };
	}

	async checkBalance(client: ClientStrategy, to: string, message: string) {
		const { balance, active } = await handlePrisma(async () => {
			const clientBalance = await this.clientService.findBalanc(client.clientId);
			if (clientBalance === null) return { balance: null, active: false };
			return clientBalance;
		});
		if (balance === null || balance < 0.25 || !active) {
			throw new UnprocessableEntityException('Saldo insuficiente para enviar mensagem');
		}
		this.clientService.payingBance(client.clientId, balance);

		return this.sendMessage(client.phone, to, message, client.clientId);
	}

	async getQrCode(phone: string): Promise<{ message: string; qr: string }> {
		const qr = this.qrcodes.get(phone);
		if (qr) return { message: 'Success', qr };
		throw new NotFoundException('QR code não encontrado');
	}
}
