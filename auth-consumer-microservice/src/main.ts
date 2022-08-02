import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { secret } from 'config/secret';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { HTTPLoggingInterceptor } from 'common/logger/logger.interceptor';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'auth-kafka',
        },
      },
    },
  );
  // app.useGlobalInterceptors(new HTTPLoggingInterceptor());

  await app.listen();
}
bootstrap();
