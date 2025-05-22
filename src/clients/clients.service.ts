import { PrismaService } from '@/prisma/prisma.service';
import { handlePrisma } from '@/shered/handle-prisma';
import { Injectable } from '@nestjs/common';
import { cpf } from 'cpf-cnpj-validator';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
	constructor(private readonly prismaService: PrismaService) {}
	create(createClientDto: CreateClientDto) {
		return handlePrisma(
			async () =>
				await this.prismaService.client.create({
					data: {
						name: createClientDto.name,
						documentId: createClientDto.document,
						documentType: cpf.isValid(String(createClientDto.document)) ? 'CPF' : 'CNPJ',
					},
				}),
		);
	}
}
