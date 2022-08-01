import { AuthService } from './auth.service';
import { AdminSignInRequest } from './dto/admin-sign-in.request';
import { AdminSignUpRequest } from './dto/admin-sign-up.request';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    postSignIn(req: any, signInRequest: AdminSignInRequest): Promise<any>;
    postSignUp(req: any, signUpRequest: AdminSignUpRequest): Promise<any>;
}
