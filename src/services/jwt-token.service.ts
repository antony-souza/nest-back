import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { environment } from 'src/environment/environment.dev';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  public generateToken(payload: IJwtPayload): string {
    try {
      return this.jwtService.sign(payload);
    } catch {
      throw new UnauthorizedException('Error generating token');
    }
  }

  public verifyToken(token: string): IJwtPayload {
    try {
      return this.jwtService.verify(token, {
        secret: environment.tokenSecret,
      });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
