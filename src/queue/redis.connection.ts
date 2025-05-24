import { RedisOptions } from 'bullmq';

export const connection: RedisOptions = {
	host: process.env.REDIS_HOST || 'localhost',
	port: Number(process.env.REDIS_PORT) || 6379,
};
