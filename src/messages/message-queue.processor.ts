import { log } from 'node:console';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('message-queue')
export class MessageQueueProcessor extends WorkerHost {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async process(job: Job<any>) {
		log(`Processando job com prioridade ${job.opts.priority}:`, job.data);
		// Lógica de processamento aqui
	}
}
