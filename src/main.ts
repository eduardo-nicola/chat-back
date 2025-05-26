import { AppModule } from '@/app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
	app.enableCors({
		origin: '*',
		credentials: true,
	});
	await app.listen(process.env.PORT ?? 3000);

	Logger.log(`Server is running on: http://localhost:${process.env.PORT ?? 3000}`, 'Bootstrap');
}
bootstrap();
