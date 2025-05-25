import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Client } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClientStrategy } from './dto/client-strategy';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SECRET_JWT || 'segredo_jwt_super_seguro',
		});
	}

	async validate(payload: Omit<Client, 'password'>): Promise<ClientStrategy> {
		return { clientId: payload.id, documentId: payload.documentId, phone: payload.phone };
	}
}
