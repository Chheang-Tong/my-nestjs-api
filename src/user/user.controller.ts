import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getMe() {
    return 'This will return the current user';
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getCurrentUser(@GetUser() user: any, @GetUser('email') email: string) {
    console.log(email);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }
  @UseGuards(JwtGuard)
  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
