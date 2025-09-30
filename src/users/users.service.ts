import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      
      const user = await this.userRepository.create({
        ...createUserDto,
        password: hashedPassword
      })

      const savedUser = await this.userRepository.save(user);
      const { password, ...userWithoutPassword } = savedUser;
      return userWithoutPassword as User;

    } catch (error) {
      this.handleExeption(error);
    }
    return 'This action adds a new user';
  }

  async findAll():  Promise<User[]>  {
   
    try {
      const users: User[]= await this.userRepository.find({
        select : ['id','userName','email','isActive','projects','role','createAt','updateAt'],
        order: { createAt: 'DESC'}
      });

      if (!users) {
        throw new NotFoundException()
      }
      return users;
  
    } catch (error) {
      this.handleExeption(error);
      return [];
    }
  }

  async findOne(id: string){

    try {
      const user = await this.userRepository.findOne({
        where : { id: id },
        select : ['id','userName','email','isActive','projects','role','createAt','updateAt'],
      })
      if (!user) {
        throw new NotFoundException()
      }
      return user;
    } catch (error) {
      this.handleExeption(error)
      
    }
    
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user =await this.userRepository.findOne({where : { id: id}})
      if (!user) {
        throw new NotFoundException()
      }

      if (updateUserDto.password) {
        updateUserDto.password =await bcrypt.hash(updateUserDto.password,10)
      }

      Object.assign(user, updateUserDto);

      const updateUser = await this.userRepository.save(user)

      const { password, ...userWithoutPassword} = updateUser;

      return userWithoutPassword as User;
      
    } catch (error) {
      this.handleExeption(error)
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where :{ id },
        select : ['id', 'userName']
      })
      if (!user) {
        throw new NotFoundException()
      }
      const removeUser =  await this.userRepository.remove(user)
      return { message: `User deleted successfully ${removeUser.userName}`  };

    } catch (error) {
      this.handleExeption(error);
    }
  }

  private handleExeption(error: any) {
    console.log(error);


    if (error instanceof NotFoundException) {
      throw error;
    }
    if (error.code == 23505) {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Unexpected error occurred');
    }
}
