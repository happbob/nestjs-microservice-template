import { Payload } from './jwt.payload';
import { Repository } from 'typeorm';
import { AdminInfo } from 'src/entity/admin-info.entity';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly adminRepository;
    constructor(adminRepository: Repository<AdminInfo>);
    validate(payload: Payload): Promise<Payload>;
}
export {};
