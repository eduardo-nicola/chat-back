import { ClientsService } from '@/clients/clients.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private clientService: ClientsService,
	) {}

	async validateClient(documentId: string, password: string): Promise<Omit<Client, 'password'>> {
		const client = await this.clientService.findByDocument(documentId);
		if (client && (await bcrypt.compare(password, client.password))) {
			const { password, ...result } = client;
			return result;
		}
		throw new UnauthorizedException('Documento ou senha inválidos');
	}

	async login(client: Omit<Client, 'password'>) {
		const payload = { documentId: client.documentId, id: client.id, phone: client.phone };
		return {
			accessToken: this.jwtService.sign(payload),
		};
	}
}
