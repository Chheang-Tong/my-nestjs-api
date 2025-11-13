import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, NoteModule],
})
export class AppModule {}
