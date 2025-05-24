import { ValidationOptions, registerDecorator } from '@nestjs/class-validator';

export function IsNotBlank(validationOptions?: ValidationOptions) {
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	return (object: Object, propertyName: string) => {
		registerDecorator({
			name: 'isNotBlank',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: unknown): boolean {
					return typeof value === 'string' && value.trim().length > 0;
				},
				defaultMessage(): string {
					return `Campo ${propertyName} não pode conter apenas espaços em branco`;
				},
			},
		});
	};
}
