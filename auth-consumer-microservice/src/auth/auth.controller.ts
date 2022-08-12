import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * description : Sign In API
   * @param PostSignInRequest
   * @returns PostSignInResponse
   */
  @MessagePattern('sign-in')
  postSignIn(@Payload() postSignInRequest) {
    return this.authService.signInUsers(postSignInRequest);
  }

  /**
   * description : Sign Up API
   * @param PostSignUpRequest
   * @returns PostSignUpResponse
   */
  @MessagePattern('sign-up')
  postSignUp(@Payload() postSignUpRequest) {
    return this.authService.createUsers(postSignUpRequest);
  }

  /**
   * description : Verification JWT API
   * @returns PostSignInResponse
   */
  @MessagePattern('jwt')
  getVerificationJWT(@Payload() user) {
    return this.authService.verficationJWT(user);
  }
}
