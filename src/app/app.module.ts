import { AuthModule } from '@/auth/auth.module';
import { ClientsModule } from '@/clients/clients.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { WhatsappModule } from '@/whatsapp/whatsapp.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
	imports: [ClientsModule, PrismaModule, AuthModule, WhatsappModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
