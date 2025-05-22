import { IsNotEmpty, MaxLength, MinLength } from '@nestjs/class-validator';

export class CreateClientDto {
	@IsNotEmpty({ message: 'Nome é obrigatorio' })
	@MinLength(2, { message: 'Nome deve ter no minimo 2 caracteres' })
	name: string;

	@IsNotEmpty({ message: 'Documento é obrigatorio' })
	@MinLength(11, { message: 'Documento deve ter no minimo 11 caracteres' })
	@MaxLength(14, { message: 'Documento deve ter no maximo 14 caracteres' })
	document: number;
}
