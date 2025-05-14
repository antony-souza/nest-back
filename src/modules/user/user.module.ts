import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtTokenService } from 'src/services/jwt-token.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtTokenService, PrismaService, JwtService],
})
export class UserModule {}
