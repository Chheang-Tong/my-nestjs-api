import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signin() {
    return { msg: 'I am Sign In' };
  }
  signup() {
    return { msg: 'I am Sign Up' };
  }
}
