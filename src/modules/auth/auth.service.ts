import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtTokenService } from 'src/services/jwt-token.service';
import { PrismaService } from 'src/services/prisma.service';
import { IJwtPayload } from 'src/services/interfaces/jwt-payload.interface';
import { HashPasswordService } from 'src/services/hash-password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly prisma: PrismaService,
  ) {}

  async handler(createAuthDto: CreateAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: createAuthDto.email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = await HashPasswordService.comparePassword(
      createAuthDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid password');
    }

    const payload: IJwtPayload = {
      userId: user.id,
    };

    const token = this.jwtTokenService.generateToken(payload);

    return {
      token: token,
    };
  }
}
