import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateFederatedUserDto } from './dto/create-federated-user.dto';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { IFile } from 'src/models/file.model';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
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

  @Post("federated")
  createFederated(@Body() createFederatedUserDto: CreateFederatedUserDto) {
    return this.service.create(createFederatedUserDto);
  }

  @Post("team-member")
  addTeamMember(@Body() dto: CreateTeamMemberDto) {
    return this.service.addTeamMember(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('fid/:id')
  findByFirebaseId(@Param('id') id: string) {
    return this.service.findByFirebaseId(id);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.service.findByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.service.update(id, updateUserDto);
  }

  @Get('by-operator/:id')
  findByOperator(@Param('id') id: string) {
    return this.service.findAllByOperatorId(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
