import { ValidationOptions, registerDecorator } from '@nestjs/class-validator';
import { cnpj, cpf } from 'cpf-cnpj-validator';

export function isCpfOrCnpj(validationOptions?: ValidationOptions) {
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	return (object: Object, propertyName: string) => {
		registerDecorator({
			name: 'isCpfOrCnpj',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: unknown): boolean {
					return typeof value === 'string' && (cnpj.isValid(value) || cpf.isValid(value));
				},
				defaultMessage(): string {
					return 'Documento deve ser CPF ou CNPJ válido';
				},
			},
		});
	};
}
