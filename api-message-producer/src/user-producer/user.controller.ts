import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth-producer/jwt/jwt.guard';
import { GetUsersResponse } from './dto/get-users.response';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor() {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'KAFKA',
        // ssl: true,
        brokers: ['kafka-internal.io:9092'],
      },
      consumer: {
        groupId: 'user-kafka', // Should be the same thing we give in consumer
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('users');
    await this.client.connect();
  }

  /**
   * description : Retrieve User API
   * @returns GetUsersResponse
   */
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 1000,
    description: 'Success',
    type: GetUsersResponse,
  })
  @ApiResponse({
    status: 2000,
    description: 'Please Check JWT Token',
  })
  @ApiResponse({
    status: 2013,
    description: 'This User Dose Not Exist',
  })
  @ApiResponse({
    status: 4000,
    description: 'Server Error',
  })
  @ApiOperation({ summary: 'Retrieve User API' })
  @ApiHeader({
    description: 'jwt token',
    name: 'x-access-token',
    example: 'JWT TOKEN',
  })
  @Get()
  getUsers(@Request() req) {
    return this.client.send('users', req.user);
  }
}
