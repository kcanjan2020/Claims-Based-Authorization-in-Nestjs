import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { compare, genSalt, hash } from 'bcryptjs';

@Injectable()
export class BcryptService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(data.toString(), salt); // Convert data to string
  }

  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data.toString(), encrypted); // Convert data to string
  }
}
