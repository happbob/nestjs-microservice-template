export declare function generateRandomString(length: number): any;
export declare function sha512(password: string, salt: string): {
    salt: string;
    hashedPassword: any;
};
export declare function saltHashPassword(password: string): {
    salt: string;
    hashedPassword: any;
};
export declare function validatePassword(password: string, salt: string, hashedPassword: string): boolean;
