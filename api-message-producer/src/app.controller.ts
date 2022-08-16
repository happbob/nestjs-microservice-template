/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Controller()
@ApiTags('Main')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
