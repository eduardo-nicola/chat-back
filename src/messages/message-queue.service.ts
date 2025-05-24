import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class MessageQueueService {
	constructor(@InjectQueue('message-queue') private readonly queue: Queue) {}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async addJob(data: any, priority: number) {
		await this.queue.add('message-queue', data, {
			priority,
			removeOnComplete: true,
			removeOnFail: true,
		});
	}
}
