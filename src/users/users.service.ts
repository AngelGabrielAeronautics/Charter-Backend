import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateFederatedUserDto } from './dto/create-federated-user.dto';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { generateUID } from 'src/utils/uid.util';
import { FirebaseRepository } from 'src/firebase/firebase.repository';
import { IFile } from 'src/models/file.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private model: Model<User>,
    private firebaseRepository: FirebaseRepository
  ) { }

  create(createUserDto: CreateUserDto) {
    const newUser = new this.model(createUserDto);
    return newUser.save();
  }

  async upload(file: IFile, id: string, key: string) {
    return await this.model.findByIdAndUpdate(id, { [key]: file }, { new: true })
  }

  async createFederated(createFederatedUserDto: CreateFederatedUserDto) {
    const { email, fid, displayName, provider, token } = createFederatedUserDto;
    // Check if the user already exists, if so update otherwise create
    const userResponse = await this.findByEmail(email);

    console.log(userResponse);

    if (userResponse._id) {
      const updates: any = {
        fid, lastLogin: new Date()
      }

      if (!userResponse.displayName && displayName) updates.displayName = displayName;
      if (!userResponse.provider && provider) updates.provider = provider;
      if (!userResponse.token && token) updates.token = token;

      return await this.model.findByIdAndUpdate(userResponse._id, updates, { new: true })
    }

    const payload = { ...createFederatedUserDto, lastLogin: new Date() };
    return await this.model.create(payload);
  }

  findByFirebaseId(id: string) {
    return this.model.findOne({ fid: id });
  }

  async findByEmail(email: string) {
    return await this.model.findOne({ email: email });
  }

  findAll() {
    return this.model.find();
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  async findAllByOperatorId(id: string) {
    return this.model.find({ operatorId: id }).select('-token -fid -operatorId -__v -role');
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const doc = await this.model
      .findByIdAndUpdate(id, updateUserDto, { new: true });

    if (!doc) {
      throw new HttpException('Not Found', HttpStatus.NOT_MODIFIED);
    }

    return doc;
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  async addTeamMember(dto: CreateTeamMemberDto) {

    try {
      const password = generateUID();

      const firebaseUser = await this.firebaseRepository.firebaseAuth.createUser({
        email: dto.email,
        emailVerified: true,
        password,
        displayName: dto.displayName,
      })

      console.log(password);

      let userDto: CreateUserDto = {
        fid: firebaseUser.uid,
        firstNames: dto.firstNames,
        lastName: dto.lastName,
        displayName: dto.displayName,
        operatorId: dto.operatorId,
        email: dto.email,
        provider: 'email',
        role: dto.role,
        rolePermissions: dto.rolePermissions,
      }

      return this.create(userDto);
    }
    catch (e) {
      throw new BadRequestException(e.message);
    }

  }
}
