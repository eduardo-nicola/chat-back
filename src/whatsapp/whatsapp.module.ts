import { ChatsModule } from '@/chats/chats.module';
import { ClientsModule } from '@/clients/clients.module';
import { MessageModule } from '@/message/message.module';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappService } from './whatsapp.service';

@Module({
	controllers: [WhatsappController],
	providers: [WhatsappService, PrismaService],
	exports: [WhatsappService],
	imports: [ChatsModule, ClientsModule, MessageModule],
})
export class WhatsappModule {}
