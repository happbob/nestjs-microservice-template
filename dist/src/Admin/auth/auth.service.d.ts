import { JwtService } from '@nestjs/jwt';
import { AdminInfo } from 'src/entity/admin-info.entity';
import { AdminSalt } from 'src/entity/admin-salt.entity';
import { Connection, Repository } from 'typeorm';
import { AdminSignInRequest } from './dto/admin-sign-in.request';
import { AdminSignUpRequest } from './dto/admin-sign-up.request';
import { Authority } from 'src/entity/authority.entity';
export declare class AuthService {
    private readonly adminRepository;
    private readonly adminSaltRepository;
    private readonly authorityRepository;
    private jwtService;
    private connection;
    constructor(adminRepository: Repository<AdminInfo>, adminSaltRepository: Repository<AdminSalt>, authorityRepository: Repository<Authority>, jwtService: JwtService, connection: Connection);
    signInUser(request: any, signInRequest: AdminSignInRequest): Promise<any>;
    signUpUser(request: any, signUpRequest: AdminSignUpRequest): Promise<any>;
    isExistUser(id: number): Promise<boolean>;
}
