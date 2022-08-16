import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { BaseResponse } from 'config/base.response';

class PostSignInResultData {
  @ApiProperty({
    example: 'JWT Token',
    description: 'JWT Token',
    required: true,
  })
  @IsString()
  jwt: string;

  @ApiProperty({
    example: 1,
    description: 'User Id',
    required: true,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'user@email.com',
    description: 'Email',
    required: true,
  })
  @IsString()
  email: string;
}

export abstract class PostSignInResponse extends BaseResponse {
  @ApiProperty({
    description: 'Result Object',
    required: true,
  })
  @IsArray()
  result: PostSignInResultData;
}
