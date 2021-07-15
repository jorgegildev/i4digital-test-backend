import { Controller, Get, Res } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

  result: any;
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@Res() res) {
    this.result = await this.postsService.getPosts();
    return res.status(this.result.statusCode).json(this.result);
  }

}
