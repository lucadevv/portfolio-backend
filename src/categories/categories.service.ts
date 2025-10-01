import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto):Promise<Category> {
    try {
      const category = await this.categoryRepository.create(createCategoryDto)

      const saveCategory =  await this.categoryRepository.save(category)

      return saveCategory as Category;

    } catch (error) {
      this.handleExecption(error)
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryRepository.find({
        
        order: {createAt: 'DESC'}
      })
      if (!categories) {
        throw new NotFoundException()
      }
      return categories as Category[]
    } catch (error) {
      this.handleExecption(error) 
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id : id}
      })
      if(!category) throw new NotFoundException()
      return category as Category
    } catch (error) {
      this.handleExecption(error)
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOne({
        where : {id }
      })

      if(!category) throw new NotFoundException()
      
      Object.assign(category,updateCategoryDto)
      const updateCategory = await this.categoryRepository.save(category);

      return updateCategory as Category;

    } catch (error) {
      this.handleExecption(error)
    }
  }

  async remove(id: string) {
    try {
      const category =await this.categoryRepository.findOne({
        where : { id: id}
      })
      if (!category) {
        throw new NotFoundException()
      }
      const categoryRemove = await this.categoryRepository.remove(category)

      return { message : `Category delete ${categoryRemove.name}`};
    } catch (error) {
      this.handleExecption(error)
    }
  }

  private handleExecption(error:any):never{
    console.log(error);
    
    if (error.code === '23505') {
      throw new BadRequestException('Project already exists');
    }
    if (error instanceof NotFoundException) {
      throw new NotFoundException()
    }
    throw new InternalServerErrorException('An unexpected error occurred');
  }
}
