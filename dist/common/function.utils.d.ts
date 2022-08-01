export declare function makeResponse(response: any, data: any | any[] | undefined): any;
export declare function ApiAuthorityCheck(authority: string, list: string[]): boolean;
export declare function saveApiCallHistory(historyType: string, userType: string, apiName: string, req: any, res: any): Promise<void>;
