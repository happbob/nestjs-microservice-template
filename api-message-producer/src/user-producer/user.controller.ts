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
        clientId: 'kafkaSample',
        brokers: ['localhost:9092'],
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
   * description : User 조회 API
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: GetUsersResponse,
  })
  @ApiResponse({
    status: 2000,
    description: 'JWT 토큰을 확인해주세요.',
  })
  @ApiResponse({
    status: 2013,
    description: '존재하지 않는 유저입니다.',
  })
  @ApiResponse({
    status: 4000,
    description: '서버 에러',
  })
  @ApiOperation({ summary: 'User 조회 API' })
  @ApiHeader({
    description: 'jwt token',
    name: 'x-access-token',
    example: 'JWT TOKEN',
  })
  @Get()
  getVerificationJWT(@Request() req) {
    return this.client.send('users', req.user);
  }
}
