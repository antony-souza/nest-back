import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { environment } from 'src/environment/environment.dev';

export class NeedApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['api-key'];
    if (!apiKey) {
      return res.status(401).json({ message: 'API key not found' });
    }

    if (apiKey !== environment.api_key) {
      return res.status(403).json({ message: 'Invalid API key' });
    }

    next();
  }
}
