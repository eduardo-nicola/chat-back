import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
	providers: [ChatsService],
	controllers: [ChatsController],
	exports: [ChatsService],
})
export class ChatsModule {}
