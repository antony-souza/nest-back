import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtTokenService } from 'src/services/jwt-token.service';
import { PrismaService } from 'src/services/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtTokenService, PrismaService, JwtService],
})
export class AuthModule {}
