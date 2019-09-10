import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoInterface } from './todo.interface';
import { CreateTodoDto } from './create-todo.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Todo') private readonly todoModel: Model<TodoInterface>,
  ) {}

  async getAllFromDb(): Promise<TodoInterface[]> {
    return await this.todoModel.find().exec();
  }

  async getById(id: string): Promise<TodoInterface> {
    return await this.todoModel.findById(id).exec();
  }

  async add(todoDto: CreateTodoDto): Promise<TodoInterface> {
    const newTodo = await new this.todoModel(todoDto);
    return newTodo.save();
  }

  async update(id: string, todoDto: CreateTodoDto): Promise<TodoInterface> {
    return await this.todoModel.findByIdAndUpdate(id, todoDto, { new: true });
  }

  async remove(id: string): Promise<void> {
    const response = await this.todoModel.deleteOne({ _id: id }).exec();
    if (response.n === 0) {
      throw new NotFoundException('Could not find todo');
    }
  }
}
