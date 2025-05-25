import { IsNotBlank } from '@/decorators/is-not-blanck';
import { IsNotEmpty, IsString, MaxLength } from '@nestjs/class-validator';

export class CreateSendMessageDto {
	@IsString({ message: 'O campo message deve ser uma string' })
	@IsNotEmpty({ message: 'O campo message não pode ser vazio' })
	@MaxLength(255)
	@IsNotBlank({ message: 'O campo message não pode conter apenas espaços em branco' })
	message: string;

	@IsString({ message: 'O campo toPhone deve ser uma string' })
	@IsNotEmpty({ message: 'O campo toPhone não pode ser vazio' })
	toPhone: string;
}
