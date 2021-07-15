import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { RequestsModule } from './requests/requests.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, PostsModule, RequestsModule,
    MongooseModule.forRoot('mongodb+srv://admin:i4digital@cluster0.qauda.mongodb.net/i4d?retryWrites=true&w=majority',{
      useNewUrlParser:true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
