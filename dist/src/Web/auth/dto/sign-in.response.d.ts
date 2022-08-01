import { BaseResponse } from 'config/base.response';
declare class SignInResponseData {
    jwt: string;
    id: number;
    email: string;
}
export declare abstract class SignInResponse extends BaseResponse {
    result: SignInResponseData;
}
export {};
