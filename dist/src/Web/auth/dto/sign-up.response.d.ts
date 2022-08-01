import { BaseResponse } from 'config/base.response';
declare class SignUpResultData {
    id: number;
    email: string;
}
export declare abstract class SignUpResponse extends BaseResponse {
    result: SignUpResultData;
}
export {};
