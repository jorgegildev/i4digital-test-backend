import { HttpModule, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { RequestsModule } from '../requests/requests.module';

@Module({
  imports: [HttpModule, RequestsModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
