import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsSchema } from './schemas/requests.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'Requests', schema: RequestsSchema}
    ])
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService]
})
export class RequestsModule {}
