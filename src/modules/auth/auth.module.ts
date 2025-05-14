import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtTokenService } from 'src/services/jwt-token.service';
import { PrismaService } from 'src/services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/environment/environment.dev';

@Module({
  imports: [
    JwtModule.register({
      secret: environment.tokenSecret,
      signOptions: { expiresIn: environment.tokenExpiration },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtTokenService, PrismaService],
})
export class AuthModule {}
