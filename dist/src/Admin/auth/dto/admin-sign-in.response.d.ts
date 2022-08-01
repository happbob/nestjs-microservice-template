import { BaseResponse } from 'config/base.response';
declare class AdminSignInResponseData {
    jwt: string;
    id: number;
    authority: string;
}
export declare abstract class AdminSignInResponse extends BaseResponse {
    result: AdminSignInResponseData;
}
export {};
