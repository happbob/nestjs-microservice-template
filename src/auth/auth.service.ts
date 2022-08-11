import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { makeResponse, saveApiCallHistory } from 'common/function.utils';
import { RESPONSE } from 'config/response.utils';
import { UserInfo } from 'src/entity/user-info.entity';
import { UserSalt } from 'src/entity/user-salt.entity';
import { Connection, Repository } from 'typeorm';
import { SignInRequest } from './dto/sign-in.request';
import { SignUpRequest } from './dto/sign-up.request';
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

  async signInUsers(request: any, signInRequest: SignInRequest) {
    try {
      // 입력한 이메일에 해당하는 유저값 추출
      const user = await this.userRepository.findOne({
        where: { email: signInRequest.email, status: 'ACTIVE' },
      });

      // 존재하지 않는 유저 체크
      if (user == undefined) {
        return RESPONSE.NON_EXIST_EMAIL;
      }

      //유저 아이디에 해당하는 Salt값 추출
      const userSalt = await this.userSaltRepository.findOne({
        where: { userId: user.id },
      });

      // Salt값을 이용해서 현재 입력된 비밀번호와 암호화된 비밀번호 검증
      if (
        !validatePassword(signInRequest.password, userSalt.salt, user.password)
      ) {
        return RESPONSE.NON_MATCH_PASSWORD;
      }

      //payload값 생성
      const payload: Payload = {
        id: user.id,
        email: signInRequest.email,
        role: Role.USER,
      };

      //토큰 생성
      const token = await this.jwtService.sign(payload);

      // Response의 result 객체에 Data를 담는 부분
      const data = {
        jwt: token,
        id: user.id,
        email: signInRequest.email,
      };

      const result = makeResponse(RESPONSE.SUCCESS, data);
      await saveApiCallHistory(
        HistoryType.READ,
        Role.USER,
        '[유저] 로그인 API',
        request,
        result,
      );

      return result;
    } catch (error) {
      return RESPONSE.ERROR;
    }
  }

  async createUsers(request: any, signUpRequest: SignUpRequest) {
    const securityData = saltHashPassword(signUpRequest.password);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 가입한 이메일이 존재하는지 체크
      const isExistUserByEmail = await this.userRepository.count({
        where: { email: signUpRequest.email, status: 'ACTIVE' },
      });

      // user 정보가 있는지 체크
      if (isExistUserByEmail > 0) {
        return RESPONSE.EXIST_EMAIL;
      }

      // UserInfo 인스턴스 생성후, 정보 담는 부분
      const userInfo = new UserInfo();
      userInfo.email = signUpRequest.email;
      userInfo.password = securityData.hashedPassword;
      userInfo.nickname = signUpRequest.nickname;
      const createUserData = await queryRunner.manager.save(userInfo);

      // UserSalt 인스턴스 생성후, 정보 담는 부분
      const userSalt = new UserSalt();
      userSalt.salt = securityData.salt;
      userSalt.userId = createUserData.id;
      await queryRunner.manager.save(userSalt);

      // Response의 result 객체에 Data를 담는 부분
      const data = {
        id: createUserData.id,
        email: createUserData.email,
      };

      const result = makeResponse(RESPONSE.SUCCESS, data);
      await saveApiCallHistory(
        HistoryType.CREATE,
        Role.USER,
        '[유저] 회원가입 API',
        request,
        result,
      );

      // Commit
      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      // Rollback
      await queryRunner.rollbackTransaction();
      return RESPONSE.ERROR;
    } finally {
      await queryRunner.release();
    }
  }

  async verficationJWT(request: any) {
    try {
      //payload값 생성
      const payload: Payload = {
        id: request.user.id,
        email: request.user.email,
        role: Role.USER,
      };

      //토큰 생성
      const token = await this.jwtService.sign(payload);

      // Response의 result 객체에 Data를 담는 부분
      const data = {
        jwt: token,
        id: request.user.id,
        email: request.user.email,
      };

      const result = makeResponse(RESPONSE.SUCCESS, data);
      await saveApiCallHistory(
        HistoryType.READ,
        Role.USER,
        '[유저] JWT 검증 API',
        request,
        result,
      );

      return result;
    } catch (error) {
      return RESPONSE.ERROR;
    }
  }
}
