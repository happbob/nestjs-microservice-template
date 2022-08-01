import { JwtService } from '@nestjs/jwt';
import { UserInfo } from 'src/entity/user-info.entity';
import { UserSalt } from 'src/entity/user-salt.entity';
import { Connection, Repository } from 'typeorm';
import { SignInRequest } from './dto/sign-in.request';
import { SignUpRequest } from './dto/sign-up.request';
export declare class AuthService {
    private readonly userRepository;
    private readonly userSaltRepository;
    private jwtService;
    private connection;
    constructor(userRepository: Repository<UserInfo>, userSaltRepository: Repository<UserSalt>, jwtService: JwtService, connection: Connection);
    signInUser(request: any, signInRequest: SignInRequest): Promise<any>;
    signUpUser(request: any, signUpRequest: SignUpRequest): Promise<any>;
    isExistUser(id: number): Promise<boolean>;
}
