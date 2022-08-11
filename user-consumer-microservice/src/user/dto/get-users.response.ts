import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { BaseResponse } from 'config/base.response';

class Users {
  @ApiProperty({
    example: 1,
    description: '유저 아이디',
    required: true,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'user@email.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '쿠키',
    description: '닉네임',
    required: false,
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    example: 'ACTIVE',
    description: '회원 상태',
    required: true,
  })
  @IsString()
  status: string;
}

class GetUsersResultData {
  @ApiProperty({
    description: '유저 객체 리스트',
    type: Array<Users>,
    required: true,
    isArray: true,
  })
  @IsArray()
  users: Array<Users>;
}

export abstract class GetUsersResponse extends BaseResponse {
  @ApiProperty({
    description: 'result 객체',
    required: true,
  })
  @IsArray()
  result: GetUsersResultData;
}
