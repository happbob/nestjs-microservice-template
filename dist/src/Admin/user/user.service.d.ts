import { UserInfo } from 'src/entity/user-info.entity';
import { Repository } from 'typeorm';
import { Payload } from '../auth/jwt/jwt.payload';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserInfo>);
    retrieveUsers(payload: Payload, request: any): Promise<any>;
}
