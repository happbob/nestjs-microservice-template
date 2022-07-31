/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // private readonly jwtService: JwtService,
  ) {}

  @MessagePattern('my-first-topic')
  getHello(@Payload() message) {
    console.log(message);
    return 'Hello World';
  }
}
