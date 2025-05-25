import { Body, Controller, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { BodyWebhookBalance } from './dto/body-webhook-balance';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
	constructor(private readonly clientsService: ClientsService) {}

	@Post()
	create(@Body() createClientDto: CreateClientDto) {
		return this.clientsService.create(createClientDto);
	}

	@Post('balance')
	async webhookBalance(@Body() body: BodyWebhookBalance) {
		const { document, balance } = body;
		return this.clientsService.updateBalance(document, balance);
	}
}
