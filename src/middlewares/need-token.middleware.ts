import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtTokenService } from 'src/services/jwt-token.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = this.jwtTokenService.verifyToken(token);
      req['userData'] = payload;
      next();
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
