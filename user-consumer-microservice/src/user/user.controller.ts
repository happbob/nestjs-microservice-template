import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * description : Retrieve User API
   * @returns GetUsersResponse
   */
  @MessagePattern('users')
  getUsers() {
    return this.userService.retrieveUsers();
  }
}
