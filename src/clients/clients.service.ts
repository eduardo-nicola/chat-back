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
		return handlePrisma(
			async () =>
				await this.prismaService.client.create({
					data: {
						name: createClientDto.name,
						documentId: createClientDto.document,
						documentType: cpf.isValid(String(createClientDto.document)) ? 'CPF' : 'CNPJ',
						password: hashPassword,
					},
					omit: {
						password: true,
					},
				}),
		);
	}

	findByDocument(documentId: string) {
		return handlePrisma(
			async () =>
				await this.prismaService.client.findUnique({
					where: {
						documentId: documentId,
					},
				}),
		);
	}
}
