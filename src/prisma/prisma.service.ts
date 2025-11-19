import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // url:
          //   process.env.DATABASE_URL ||
          //   'postgresql://devuser:123@localhost:5432/nest?schema=public',
          url: config.get('DATABASE_URL'),
        },
      },
    });
    console.log('Database URL:', config.get('DATABASE_URL'));
  }
  cleanDb() {
    return this.$transaction([
      this.bookMark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
