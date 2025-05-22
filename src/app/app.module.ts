import { ClientsModule } from '@/clients/clients.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [ClientsModule, PrismaModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
