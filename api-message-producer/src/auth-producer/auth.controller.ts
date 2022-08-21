import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostSignUp, PostSignIn } from '../decorators/auth.decorator';
import { PostSignInRequest } from './dto/post-sign-in.request';
import { PostSignInResponse } from './dto/post-sign-in.response';
import { PostSignUpRequest } from './dto/post-sign-up.request';
import { PostSignUpResponse } from './dto/post-sign-up.response';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { ValidationPipe } from 'config/pipe/validation.pipe';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
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
        groupId: 'auth-kafka',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('sign-in');
    this.client.subscribeToResponseOf('sign-up');
    this.client.subscribeToResponseOf('jwt');
    try {
      await this.client.connect();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * description : Sign In API
   * @param PostSignInRequest
   * @returns PostSignInResponse
   */
  @ApiResponse({
    status: 1000,
    description: 'Success',
    type: PostSignInResponse,
  })
  @ApiResponse({
    status: 2013,
    description: 'This User Dose Not Exist',
  })
  @ApiResponse({
    status: 2004,
    description: 'Please Input Email',
  })
  @ApiResponse({
    status: 2005,
    description: 'Invalid Email',
  })
  @ApiResponse({
    status: 2006,
    description: 'Please Input Password',
  })
  @ApiResponse({
    status: 2007,
    description: 'Invalid Password',
  })
  @ApiResponse({
    status: 2002,
    description: 'Please Check Email',
  })
  @ApiResponse({
    status: 2003,
    description: 'Password Do Not Match',
  })
  @ApiResponse({
    status: 2015,
    description: 'Invalid Authority',
  })
  @ApiResponse({
    status: 4000,
    description: 'Server Error',
  })
  @ApiOperation({ summary: 'Sign In' })
  @ApiBody({
    description: 'Sign In DTO',
    type: PostSignInRequest,
    required: false,
  })
  @Post('sign-in')
  @UsePipes(new ValidationPipe())
  postSignIn(
    @Request() req,
    @PostSignIn() postSignInRequest: PostSignInRequest,
  ) {
    return this.client.send('sign-in', postSignInRequest);
  }

  /**
   * description : Sign Up API
   * @param PostSignUpRequest
   * @returns PostSignUpResponse
   */
  @ApiResponse({
    status: 1000,
    description: 'Success',
    type: PostSignUpResponse,
  })
  @ApiResponse({
    status: 2004,
    description: 'Please Input Email',
  })
  @ApiResponse({
    status: 2005,
    description: 'Invalid Email',
  })
  @ApiResponse({
    status: 2006,
    description: 'Please Input Password',
  })
  @ApiResponse({
    status: 2007,
    description: 'Invalid Password',
  })
  @ApiResponse({
    status: 2008,
    description: 'Please Input Confirm Password',
  })
  @ApiResponse({
    status: 2009,
    description: 'Invalid Confirm Password',
  })
  @ApiResponse({
    status: 2010,
    description: 'The Confirm Password Does Not Match',
  })
  @ApiResponse({
    status: 2011,
    description: 'Please Input Nickname',
  })
  @ApiResponse({
    status: 2012,
    description: 'This Email Is Alrealdy In Use',
  })
  @ApiResponse({
    status: 2017,
    description: 'Nickname exceeds 20 Characters',
  })
  @ApiResponse({
    status: 4000,
    description: 'Server Error',
  })
  @ApiOperation({ summary: 'Sign Up' })
  @ApiBody({ description: 'Sign Up DTO', type: PostSignUpRequest })
  @Post('sign-up')
  postSignUp(
    @Request() req,
    @PostSignUp() postSignUpRequest: PostSignUpRequest,
  ) {
    return this.client.send('sign-up', postSignUpRequest);
  }

  /**
   * description : Verification JWT API
   * @returns PostSignInResponse
   */
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 1000,
    description: 'Success',
    type: PostSignInResponse,
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
  @ApiOperation({ summary: 'Verification JWT API' })
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
