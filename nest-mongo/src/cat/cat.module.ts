import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schemas/cat.schema';
import { CatsService } from './cat.service';
import { CatsController } from './cat.controller'

// mongodb 를 미리 알고있어야 의미 있을거같은데 다 까먹어서.....
@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}