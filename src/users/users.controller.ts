import { Controller, Get, Param, Res } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  result: any;
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Res() res) {
    this.result = await this.usersService.getUsers();
    return res.status(this.result.statusCode).json(this.result);
  }

  @Get('photos/:userId')
  async getUserPhotos(@Res() res, @Param('userId') userId: number) {
    this.result = await this.usersService.getUserPhotos(userId);
    return res.status(this.result.statusCode).json(this.result);
  }

}
