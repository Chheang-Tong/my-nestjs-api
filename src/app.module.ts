import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { NoteModule } from './note/note.module';
import { MainModule } from './main/main.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, NoteModule, MainModule],
})
export class AppModule {}
