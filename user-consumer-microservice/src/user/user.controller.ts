import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * description : User 조회 API
   * @param message
   * @returns GetUsersResponse
   */
  @MessagePattern('users')
  getUsers() {
    return this.userService.retrieveUsers();
  }
}
