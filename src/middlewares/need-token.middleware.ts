import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, NextFunction } from 'express';
import { JwtTokenService } from 'src/services/jwt-token.service';

@Injectable()
export class NeedTokenMiddleware implements NestMiddleware {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  use(req: Request, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const tokenDecoded = this.jwtTokenService.verifyToken(token);
      req['userData'] = tokenDecoded;
      next();
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
