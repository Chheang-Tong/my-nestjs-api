/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SigninDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignupDto) {
    console.log('DTO received:', dto);

    const hash = await argon2.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          name: dto.name,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          name: true,
        },
      });

      return this.signToken(user.id, user.email, user.name!);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
          // throw new Error('Email already exists');
        }
      }
      throw error;
    }
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        hash: true,
        createdAt: true,
      }, //select data that we want to return
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    const pwMatches = await argon2.verify(user.hash, dto.password);
    if (!pwMatches) throw new ForbiddenException('Invalid credentials');
    const { id, createdAt, ...result } = user; // remove data that we don't want to return
    return this.signToken(user.id, user.email, user.name!);
  }
  async signToken(
    userId: number,
    email: string,
    name: string,
  ): Promise<{ access_token: string; email: string; name: string }> {
    const payload = {
      id: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      email: email,
      name: name,
      access_token: token,
    };
  }
}
