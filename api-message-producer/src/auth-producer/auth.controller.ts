import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignUpUser, SignInUser } from '../decorators/auth.decorator';
import { PostSignInRequest } from './dto/post-sign-in.request';
import { PostSignInResponse } from './dto/post-sign-in.response';
import { PostSignUpRequest } from './dto/post-sign-up.request';
import { PostSignUpResponse } from './dto/post-sign-up.response';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor() {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafkaSample',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'auth-kafka', // Should be the same thing we give in consumer
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('sign-in');
    this.client.subscribeToResponseOf('sign-up');
    this.client.subscribeToResponseOf('jwt');
    await this.client.connect();
  }

  /**
   * description : 로그인 API
   * @param PostSignInRequest
   * @returns PostSignInResponse
   */
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: PostSignInResponse,
  })
  @ApiResponse({
    status: 2013,
    description: '존재하지 않는 유저입니다.',
  })
  @ApiResponse({
    status: 2004,
    description: '이메일을 입력해주세요.',
  })
  @ApiResponse({
    status: 2005,
    description: '유효하지 않은 이메일 입니다.',
  })
  @ApiResponse({
    status: 2006,
    description: '비밀번호를 입력해주세요',
  })
  @ApiResponse({
    status: 2007,
    description: '유효하지 않은 비밀번호 입니다.',
  })
  @ApiResponse({
    status: 2002,
    description: '이메일을 확인해주세요',
  })
  @ApiResponse({
    status: 2003,
    description: '비밀번호가 일치하지 않습니다.',
  })
  @ApiResponse({
    status: 2015,
    description: '유효하지 않은 권한입니다.',
  })
  @ApiResponse({
    status: 4000,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ description: '로그인 DTO', type: PostSignInRequest })
  @Post('sign-in')
  postSignIn(@Request() req, @SignInUser() signInRequest: PostSignInRequest) {
    return this.client.send('sign-in', signInRequest);
  }

  /**
   * description : 회원가입 API
   * @param PostSignUpRequest
   * @returns PostSignUpResponse
   */
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: PostSignUpResponse,
  })
  @ApiResponse({
    status: 2004,
    description: '이메일을 입력해주세요.',
  })
  @ApiResponse({
    status: 2005,
    description: '유효하지 않은 이메일 입니다.',
  })
  @ApiResponse({
    status: 2006,
    description: '비밀번호를 입력해주세요.',
  })
  @ApiResponse({
    status: 2007,
    description: '유효하지 않은 비밀번호 입니다.',
  })
  @ApiResponse({
    status: 2008,
    description: '확인 비밀번호를 입력해주세요.',
  })
  @ApiResponse({
    status: 2009,
    description: '유효하지 않은 확인 비밀번호 입니다.',
  })
  @ApiResponse({
    status: 2010,
    description: '확인 비밀번호와 일치하지 않습니다.',
  })
  @ApiResponse({
    status: 2012,
    description: '이미 사용중인 이메일입니다.',
  })
  @ApiResponse({
    status: 2011,
    description: '닉네임을 입력해주세요.',
  })
  @ApiResponse({
    status: 2017,
    description: '닉네임이 20자를 초과합니다.',
  })
  @ApiResponse({
    status: 4000,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ description: '회원가입 DTO', type: PostSignUpRequest })
  @Post('sign-up')
  postSignUp(@Request() req, @SignUpUser() signUpRequest: PostSignUpRequest) {
    return this.client.send('sign-up', signUpRequest);
  }

  /**
   * description : JWT 검증 API
   * @returns PostSignInResponse
   */
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: PostSignInResponse,
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
  @ApiOperation({ summary: 'JWT 검증 API' })
  @ApiHeader({
    description: 'jwt token',
    name: 'x-access-token',
    example: 'JWT TOKEN',
  })
  @Get('jwt')
  getVerificationJWT(@Request() req) {
    return this.client.send('jwt', req.user);
  }
}
