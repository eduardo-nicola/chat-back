import { ClientsModule } from '@/clients/clients.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: process.env.SECRET_JWT || 'segredo_jwt_super_seguro',
			signOptions: { expiresIn: '7d' },
		}),
		ClientsModule,
	],
	providers: [AuthService, JwtStrategy, JwtAuthGuard],
	controllers: [AuthController],
})
export class AuthModule {}
