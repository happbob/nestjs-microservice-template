import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignUpUser, SignInUser } from '../decorators/auth.decorator';
import { AuthService } from './auth.service';
import { SignInRequest } from './dto/sign-in.request';
import { SignInResponse } from './dto/sign-in.response';
import { SignUpRequest } from './dto/sign-up.request';
import { SignUpResponse } from './dto/sign-up.response';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * description : 로그인 API
   * @param SignInRequest
   * @returns SignInResponse
   */
  @MessagePattern('sign-in')
  postSignIn(@Payload() message) {
    return this.authService.signInUsers(message);
  }

  /**
   * description : 회원가입 API
   * @param SignUpRequest
   * @returns SignUpResponse
   */
  @MessagePattern('sign-up')
  postSignUp(@Payload() message) {
    return this.authService.createUsers(message);
  }

  /**
   * description : JWT 검증 API
   * @returns SignInResponse
   */
  @MessagePattern('jwt')
  getVerificationJWT(@Payload() message) {
    return this.authService.verficationJWT(message);
  }
}
