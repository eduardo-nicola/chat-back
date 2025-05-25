import * as path from 'node:path';
import { ClientStrategy } from '@/auth/dto/client-strategy';
import { handlePrisma } from '@/shered/handle-prisma';
import {
	Injectable,
	Logger,
	NotFoundException,
	UnauthorizedException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConfig, Message, Whatsapp, create } from 'venom-bot';

@Injectable()
export class WhatsappService {
	private readonly logger = new Logger(WhatsappService.name);
	private clients: Map<string, Whatsapp> = new Map();
	private qrcodes: Map<string, string> = new Map();

	constructor(private readonly prisma: PrismaService) {}

	private getSessionFolder(phone: string): string {
		return path.resolve(__dirname, 'sessions', phone);
	}

	private async sendMessage(fromPhone: string, to: string, message: string, clientId: string) {
		const client = this.clients.get(fromPhone);
		if (!client) throw new UnauthorizedException('Número não está conectado');
		const send = await client.sendText(`${to}@c.us`, message);

		if (send) {
			handlePrisma(async () => {
				this.prisma.message.create({ data: { message, status: 'SENT', clientId, fromPhone } });
			});
		}

		return { message: 'Mensagem enviado com sucesso' };
	}

	private async receivingMessage() {}

	async registerPhoneNumber(phone: string): Promise<{ message: string }> {
		const sessionFolder = this.getSessionFolder(phone);
		const options: CreateConfig = {
			browserArgs: ['--no-sandbox', '--disable-setuid-sandbox', '--remote-debugging-port=9222'],
			folderNameToken: sessionFolder,
			disableWelcome: true,
			mkdirFolderToken: sessionFolder,
			headless: 'old',
			logQR: false,
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
			const clientBalance = await this.prisma.client.findUnique({
				where: { id: client.clientId },
				select: { balance: true, active: true },
			});
			if (clientBalance === null) return { balance: null, active: false };
			return clientBalance;
		});
		if (balance === null || balance < 0.25 || !active) {
			throw new UnprocessableEntityException('Saldo insuficiente para enviar mensagem');
		}

		handlePrisma(async () => {
			await this.prisma.client.update({
				where: { id: client.clientId },
				data: { balance: balance - 0.25 },
			});
		});

		return this.sendMessage(client.phone, to, message, client.clientId);
	}

	async getQrCode(phone: string): Promise<{ message: string; qr: string }> {
		const qr = this.qrcodes.get(phone);
		if (qr) return { message: 'Success', qr };
		throw new NotFoundException('QR code não encontrado');
	}
}
