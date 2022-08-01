import { BaseResponse } from 'config/base.response';
declare class AdminSignUpResultData {
    id: number;
    email: string;
}
export declare abstract class AdminSignUpResponse extends BaseResponse {
    result: AdminSignUpResultData;
}
export {};
