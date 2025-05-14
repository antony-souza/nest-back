import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NeedApiKeyMiddleware } from './middlewares/need-api-key.middleware';
import { NeedTokenMiddleware } from './middlewares/need-token.middleware';
import { PrismaService } from './prisma/prisma.service';
import { JwtTokenService } from './services/jwt-token.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    NeedApiKeyMiddleware,
    NeedTokenMiddleware,
    JwtTokenService,
    JwtService,
  ],
  exports: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NeedApiKeyMiddleware).forRoutes('*');
    consumer
      .apply(NeedTokenMiddleware)
      .exclude({ path: 'auth/login', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
