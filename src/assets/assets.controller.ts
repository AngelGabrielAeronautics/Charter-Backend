import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { IFile } from 'src/models/file.model';

@Controller('assets')
export class AssetsController {
  constructor(private readonly service: AssetsService) { }

  @Post()
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.service.create(createAssetDto);
  }

  @Post('upload/:key/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Param('id') id: string,
    @Param('key') key: string,
    @UploadedFile(
      new ParseFilePipe(
        {
          validators: [
            new MaxFileSizeValidator({ maxSize: 5000000 })
          ]
        }
      ),
    ) file: Express.Multer.File
  ) {

    const base64 = Buffer.from(file.buffer).toString('base64');

    const fileObj: IFile = {
      name: file.originalname,
      data: base64,
      mimetype: file.mimetype,
      size: file.size
    }

    return this.service.upload(fileObj, id, key);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post('filter')
  findByFilter(@Body() filter: any) {
    return this.service.findByFilter(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.service.update(id, updateAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
