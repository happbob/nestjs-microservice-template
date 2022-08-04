import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * description : 로그인 API
   * @param message
   * @returns PostSignInResponse
   */
  @MessagePattern('sign-in')
  postSignIn(@Payload() postSignInRequest) {
    return this.authService.signInUsers(postSignInRequest);
  }

  /**
   * description : 회원가입 API
   * @param message
   * @returns PostSignUpResponse
   */
  @MessagePattern('sign-up')
  postSignUp(@Payload() postSignUpRequest) {
    return this.authService.createUsers(postSignUpRequest);
  }

  /**
   * description : JWT 검증 API
   * @param message
   * @returns PostSignInResponse
   */
  @MessagePattern('jwt')
  getVerificationJWT(@Payload() user) {
    return this.authService.verficationJWT(user);
  }
}
