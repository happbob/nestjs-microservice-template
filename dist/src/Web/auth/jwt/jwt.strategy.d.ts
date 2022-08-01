import { Payload } from './jwt.payload';
import { Repository } from 'typeorm';
import { UserInfo } from 'src/entity/user-info.entity';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly adminRepository;
    constructor(adminRepository: Repository<UserInfo>);
    validate(payload: Payload): Promise<Payload>;
}
export {};
