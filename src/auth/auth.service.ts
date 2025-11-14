/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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

      return user;
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
    return result;
  }
}
