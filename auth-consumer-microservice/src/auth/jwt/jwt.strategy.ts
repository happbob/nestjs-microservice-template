import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { Repository } from 'typeorm';
import { UserInfo } from 'src/entity/user-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RESPONSE } from 'config/response.utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    // Extract User
    const user = await this.userRepository.findOne({
      where: { id: payload.id, status: 'ACTIVE' },
    });
    // If User is Non-Exist, Throw Error
    if (user == undefined) {
      throw new HttpException(RESPONSE.NON_EXIST_USER, 201);
    }
    // Return Payload
    return payload;
  }
}
