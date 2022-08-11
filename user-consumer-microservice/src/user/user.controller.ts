import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * description : 로그인 API
   * @param SignInRequest
   * @returns SignInResponse
   */
  @MessagePattern('users')
  postSignIn(@Payload() message) {
    return this.userService.retrieveUsers(message);
  }
}
