import { AuthService } from './auth.service';
import { SignInRequest } from './dto/sign-in.request';
import { SignUpRequest } from './dto/sign-up.request';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    postSignIn(req: any, signInRequest: SignInRequest): Promise<any>;
    postSignUp(req: any, signUpRequest: SignUpRequest): Promise<any>;
}
