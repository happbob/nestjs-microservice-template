/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Controller()
@ApiTags('Main')
export class AppController {
  constructor(
    private readonly appService: AppService, // private readonly jwtService: JwtService,
  ) {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafkaSample',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'my-kafka-consumer', // Should be the same thing we give in consumer
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('my-first-topic');
    await this.client.connect();
  }

  @Get()
  getHello() {
    return this.client.send('my-first-topic', 'hello');
  }
}
