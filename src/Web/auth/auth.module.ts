import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { secret } from '../../../config/secret';
import { UserInfo } from 'src/entity/user-info.entity';
import { UserSalt } from 'src/entity/user-salt.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../Web/auth/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfo, UserSalt]),
    JwtModule.register({
      secret: secret.web_jwt_secret_key,
      signOptions: { expiresIn: '6h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
