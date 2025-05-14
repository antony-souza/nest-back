import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { environment } from 'src/environment/environment.dev';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  public generateToken(payload: IJwtPayload): string {
    const token = this.jwtService.sign(payload, {
      secret: environment.tokenSecret,
      expiresIn: environment.tokenExpiration,
    });

    if (!token) {
      throw new UnauthorizedException('Token generation failed');
    }

    return token;
  }

  public verifyToken(token: string): IJwtPayload {
    try {
      return this.jwtService.verify<IJwtPayload>(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
