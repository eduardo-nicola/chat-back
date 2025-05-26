import { PrismaService } from '@/prisma/prisma.service';
import { handlePrisma } from '@/shered/handle-prisma';
import { Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { cpf } from 'cpf-cnpj-validator';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
	constructor(private readonly prismaService: PrismaService) {}
	async create(createClientDto: CreateClientDto): Promise<Omit<Client, 'password'>> {
		const hashPassword = await bcrypt.hashSync(createClientDto.password, 10);

		const client = await handlePrisma(
			async () =>
				await this.prismaService.client.create({
					data: {
						name: createClientDto.name,
						documentId: createClientDto.document,
						documentType: cpf.isValid(String(createClientDto.document)) ? 'CPF' : 'CNPJ',
						phone: createClientDto.phone,
						password: hashPassword,
						sessionFile: `sessions/${createClientDto.phone}.json`,
					},
					omit: {
						password: true,
					},
				}),
		);
		return client;
	}

	async findByDocument(documentId: string) {
		return handlePrisma(
			async () =>
				await this.prismaService.client.findUnique({
					where: {
						documentId: documentId,
					},
				}),
		);
	}

	async updateBalance(documentId: string, balance: number) {
		const newBalance = await handlePrisma(async () => {
			return await this.prismaService.client.update({
				where: {
					documentId: documentId,
				},
				data: {
					balance: balance,
					active: true,
				},
				select: {
					balance: true,
				},
			});
		});

		return { message: 'Balance atualizado com sucesso', balance: newBalance.balance };
	}

	async payingBance(clientId: string, balance: number) {
		handlePrisma(async () => {
			await this.prismaService.client.update({
				where: { id: clientId },
				data: { balance: balance - 0.25 },
			});
		});
	}

	async findBalanc(clientId: string) {
		return handlePrisma(async () => {
			return this.prismaService.client.findUnique({
				where: { id: clientId },
				select: { balance: true, active: true },
			});
		});
	}
}
