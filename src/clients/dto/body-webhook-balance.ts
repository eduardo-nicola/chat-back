import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { PickType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

export class BodyWebhookBalance extends PickType(CreateClientDto, ['document'] as const) {
	@IsNotEmpty({ message: 'O Balance é obrigatorio' })
	@IsNumber({}, { message: 'O Balance deve ser um número' })
	balance: number;
}
