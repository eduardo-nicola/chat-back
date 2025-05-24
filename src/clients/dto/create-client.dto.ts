import { isCpfOrCnpj } from '@/decorators/is-cpf-or-cnpj';
import { IsNotBlank } from '@/decorators/is-not-blanck';
import { IsNotEmpty, MaxLength, MinLength } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';

export class CreateClientDto {
	@Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
	@IsNotBlank({ message: 'Nome não pode conter apenas espaços em branco' })
	@IsNotEmpty({ message: 'Nome é obrigatorio' })
	@MinLength(2, { message: 'Nome deve ter no minimo 2 caracteres' })
	name: string;

	@IsNotEmpty({ message: 'Documento é obrigatorio' })
	@MinLength(11, { message: 'Documento deve ter no minimo 11 caracteres' })
	@MaxLength(14, { message: 'Documento deve ter no maximo 14 caracteres' })
	@isCpfOrCnpj()
	document: string;

	@IsNotEmpty({ message: 'Senha é obrigatorio' })
	@MinLength(6, { message: 'Senha deve ter no minimo 6 caracteres' })
	password: string;
}
