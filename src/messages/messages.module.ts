import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MessageQueueProcessor } from './message-queue.processor';
import { MessageQueueService } from './message-queue.service';
import { MessagesController } from './messages.controller';

@Module({
	imports: [
		BullModule.registerQueue({
			name: 'message-queue',
		}),
	],
	providers: [MessageQueueService, MessageQueueProcessor],
	exports: [MessageQueueService],
	controllers: [MessagesController],
})
export class MessagesModule {}
