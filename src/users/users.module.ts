import { HttpModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RequestsModule } from '../requests/requests.module';

@Module({
  imports: [HttpModule, RequestsModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
