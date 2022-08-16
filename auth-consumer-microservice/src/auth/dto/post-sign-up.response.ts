import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, IsString } from 'class-validator';
import { BaseResponse } from 'config/base.response';

class PostSignUpResultData {
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

export abstract class PostSignUpResponse extends BaseResponse {
  @ApiProperty({
    description: 'Result Object',
    required: true,
  })
  @IsArray()
  result: PostSignUpResultData;
}
