import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(jwt: any, request: any): {
        isSuccess: boolean;
        code: number;
        message: string;
    } | Promise<any>;
}
