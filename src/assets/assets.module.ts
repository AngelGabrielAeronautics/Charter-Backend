import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset } from './entities/asset.entity';
import { AssetSchema } from 'src/schemas/asset.schema';
import { OperatorsModule } from 'src/operators/operators.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Asset.name,
    schema: AssetSchema
  }]), OperatorsModule],
  exports: [AssetsService],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
