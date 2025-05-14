import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { environment } from 'src/environment/environment.dev';

@Injectable()
export class HashPasswordService {
  public static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(environment.bcryptSalt);
    return await bcrypt.hash(password, salt);
  }

  public static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
