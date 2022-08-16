import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { BaseResponse } from 'config/base.response';

class Users {
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

  @ApiProperty({
    example: 'Bob',
    description: 'Nickname',
    required: false,
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'User Status',
    required: true,
  })
  @IsString()
  status: string;
}

class GetUsersResultData {
  @ApiProperty({
    description: 'User Object List',
    type: Users,
    required: true,
    isArray: true,
  })
  @IsArray()
  users: Array<Users>;
}

export abstract class GetUsersResponse extends BaseResponse {
  @ApiProperty({
    description: 'Result Object',
    required: true,
  })
  @IsArray()
  result: GetUsersResultData;
}
