import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

// Base Response Structure
export abstract class BaseResponse {
  @ApiProperty({
    example: true,
    description: 'Is API Success',
    required: true,
  })
  @IsBoolean()
  isSuccess: boolean;

  @ApiProperty({
    example: 1000,
    description: 'API Code Number',
    required: true,
  })
  @IsNumber()
  code: number;

  @ApiProperty({
    example: 'Success',
    description: 'API Success Message',
    required: true,
  })
  @IsString()
  message: string;
}
