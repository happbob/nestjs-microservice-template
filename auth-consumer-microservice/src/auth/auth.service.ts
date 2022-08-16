import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { makeResponse, saveApiCallHistory } from 'common/function.utils';
import { RESPONSE } from 'config/response.utils';
import { UserInfo } from 'src/entity/user-info.entity';
import { UserSalt } from 'src/entity/user-salt.entity';
import { Connection, Repository } from 'typeorm';
import { PostSignInRequest } from './dto/post-sign-in.request';
import { PostSignUpRequest } from './dto/post-sign-up.request';
import { Payload } from './jwt/jwt.payload';
import {
  saltHashPassword,
  validatePassword,
} from '../../config/security.utils';
import { HistoryType, Role, Status } from 'common/variable.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
    @InjectRepository(UserSalt)
    private readonly userSaltRepository: Repository<UserSalt>,
    private jwtService: JwtService,
    private connection: Connection,
  ) {}

  async signInUsers(postSignInRequest: PostSignInRequest) {
    try {
      // Extract User By Email
      const user = await this.userRepository.findOne({
        where: { email: postSignInRequest.email, status: 'ACTIVE' },
      });

      // Check User
      if (user == undefined) {
        return RESPONSE.NON_EXIST_EMAIL;
      }

      // Extract User Salt By User Id
      const userSalt = await this.userSaltRepository.findOne({
        where: { userId: user.id },
      });

      // Verification Encrypted Password
      if (
        !validatePassword(
          postSignInRequest.password,
          userSalt.salt,
          user.password,
        )
      ) {
        return RESPONSE.NON_MATCH_PASSWORD;
      }

      // Generate Payload
      const payload: Payload = {
        id: user.id,
        email: postSignInRequest.email,
        role: Role.USER,
      };

      // Generate JWT Token
      const token = await this.jwtService.sign(payload);

      // Input Result Object
      const data = {
        jwt: token,
        id: user.id,
        email: postSignInRequest.email,
      };

      const result = makeResponse(RESPONSE.SUCCESS, data);

      return result;
    } catch (error) {
      return RESPONSE.ERROR;
    }
  }

  async createUsers(postSignUpRequest: PostSignUpRequest) {
    const securityData = saltHashPassword(postSignUpRequest.password);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Check User By Email
      const isExistUserByEmail = await this.userRepository.count({
        where: { email: postSignUpRequest.email, status: 'ACTIVE' },
      });

      // Check User By Email
      if (isExistUserByEmail > 0) {
        return RESPONSE.EXIST_EMAIL;
      }

      // Generate UserInfo Class And Input Data
      const userInfo = new UserInfo();
      userInfo.email = postSignUpRequest.email;
      userInfo.password = securityData.hashedPassword;
      userInfo.nickname = postSignUpRequest.nickname;
      const createUserData = await queryRunner.manager.save(userInfo);

      // Generate UserSalt Class And Input Data
      const userSalt = new UserSalt();
      userSalt.salt = securityData.salt;
      userSalt.userId = createUserData.id;
      await queryRunner.manager.save(userSalt);

      // Input Result Object
      const data = {
        id: createUserData.id,
        email: createUserData.email,
      };

      const result = makeResponse(RESPONSE.SUCCESS, data);

      // Commit
      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      // Rollback
      await queryRunner.rollbackTransaction();
      return RESPONSE.ERROR;
    } finally {
      // Release
      await queryRunner.release();
    }
  }

  async verficationJWT(user: Payload) {
    try {
      // Generate Payload
      const payload: Payload = {
        id: user.id,
        email: user.email,
        role: Role.USER,
      };

      // Generate JWT Token
      const token = await this.jwtService.sign(payload);

      // Input Result Object
      const data = {
        jwt: token,
        id: user.id,
        email: user.email,
      };

      const result = makeResponse(RESPONSE.SUCCESS, data);

      return result;
    } catch (error) {
      return RESPONSE.ERROR;
    }
  }
}
