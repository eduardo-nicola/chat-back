import { IsNotEmpty } from '@nestjs/class-validator';

export class BodyLoginDto {
	@IsNotEmpty({ message: 'Forneça o documento' })
	documentId: string;
	@IsNotEmpty({ message: 'Forneça a senha' })
	password: string;
}
