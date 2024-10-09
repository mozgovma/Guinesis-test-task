import { Module } from '@nestjs/common';
import { EntityController } from './entity/entity.controller';

@Module({
  imports: [],
  controllers: [EntityController],
  providers: [],
})
export class AppModule {}
