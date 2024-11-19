import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { OperatorsService } from './operators.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { IFile } from 'src/models/file.model';
import { VetOperatorDto } from './dto/vet-operator.dto';

@Controller('operators')
export class OperatorsController {
  constructor(private readonly service: OperatorsService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createOperatorDto: CreateOperatorDto) {
    return this.service.create(createOperatorDto);
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateOperatorDto: UpdateOperatorDto) {
    return this.service.update(id, updateOperatorDto);
  }

  @Patch(':id/vet')
  @UsePipes(new ValidationPipe())
  vet(@Param('id') id: string, @Body() dto: VetOperatorDto) {
    return this.service.vetProfileSection(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
