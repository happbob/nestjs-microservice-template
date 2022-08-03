import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * description : 로그인 API
   * @param message
   * @returns PostSignInResponse
   */
  @MessagePattern('sign-in')
  postSignIn(@Payload() message) {
    return this.authService.signInUsers(message);
  }

  /**
   * description : 회원가입 API
   * @param message
   * @returns PostSignUpResponse
   */
  @MessagePattern('sign-up')
  postSignUp(@Payload() message) {
    return this.authService.createUsers(message);
  }

  /**
   * description : JWT 검증 API
   * @param message
   * @returns PostSignInResponse
   */
  @MessagePattern('jwt')
  getVerificationJWT(@Payload() message) {
    return this.authService.verficationJWT(message);
  }
}
