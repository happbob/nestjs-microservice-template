import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
} from '@nestjs/common';
import { RESPONSE } from 'config/response.utils';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.length === 0) {
      throw new HttpException(RESPONSE.ERROR, 201);
    }
    return value;
  }
}
