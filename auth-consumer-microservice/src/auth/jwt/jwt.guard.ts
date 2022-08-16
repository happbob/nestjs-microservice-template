import { HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RESPONSE } from 'config/response.utils';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    // JWT Error Check
    if (err != null) {
      throw new HttpException(RESPONSE.NON_EXIST_USER, 201);
    }
    // If User is Non-Exist, Throw Error
    if (!user) {
      throw new HttpException(RESPONSE.CHECK_JWT_TOKEN, 201);
    }
    return user;
  }
}
