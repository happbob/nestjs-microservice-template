/* eslint-disable @typescript-eslint/no-empty-function */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth-producer/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ApiCallHistory } from './entity/api-call-history.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'kooki7869^^',
      database: 'test',
      entities: [__dirname + '/**/entity/*.entity{.ts,.js}'],
      synchronize: true,
      bigNumberStrings: false,
      charset: 'utf8mb4',
    }),
    TypeOrmModule.forFeature([ApiCallHistory]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
