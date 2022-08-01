import { BaseResponse } from 'config/base.response';
export declare abstract class AdminGetUsersResponseDataDetail {
    id: number;
    email: string;
    nickname: string;
    createdAt: string;
    status: string;
}
export declare abstract class AdminGetUsersResponseData {
    users: Array<AdminGetUsersResponseDataDetail>;
}
export declare abstract class AdminGetUsersResponse extends BaseResponse {
    result: AdminGetUsersResponseData;
}
