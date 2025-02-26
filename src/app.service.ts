import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'The Claims BasedAuthorization in Nestjs Backend!';
  }
}
