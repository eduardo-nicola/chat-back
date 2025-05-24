import { AuthModule } from '@/auth/auth.module';
import { ClientsModule } from '@/clients/clients.module';
import { MessagesModule } from '@/messages/messages.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { connection } from '@/queue/redis.connection';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
	imports: [BullModule.forRoot({ connection }), ClientsModule, PrismaModule, AuthModule, MessagesModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
