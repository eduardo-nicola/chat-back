import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

const logger = new Logger('PrismaServiceHandle');

export async function handlePrisma<T>(operation: () => Promise<T>): Promise<T> {
	try {
		return await operation();
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				logger.warn(`Unique constraint failed on ${error.meta?.target}`);
				throw new HttpException(`Já existe um registro com esse valor para ${error.meta?.target}`, HttpStatus.CONFLICT);
			}
			if (error.code === 'P2025') {
				logger.warn(`Registro não encontrado: ${error.meta?.model}`);
				throw new HttpException('Registro não encontrado', HttpStatus.NOT_FOUND);
			}
		}
		logger.error('Erro não esperado no Prisma', error);
		throw new HttpException('Erro interno da utilização do Prisma:', HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
