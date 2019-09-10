import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Delete,
  Param,
  HttpException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './create-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async retrieveTodos(@Res() res) {
    const todos = await this.todoService.getAllFromDb();
    return res.status(HttpStatus.OK).json(todos);
  }

  @Get(':id')
  async retrieveTodoById(@Res() res, @Param('id') id: string) {
    const todo = await this.todoService.getById(id);
    if (todo) {
      return res.status(HttpStatus.OK).json(todo);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Item Not Found',
        },
        404,
      );
    }
  }

  @Post()
  async saveTodo(@Res() res, @Body() todoDto: CreateTodoDto) {
    const createdTodo = await this.todoService.add(todoDto);
    return res.status(HttpStatus.OK).json(createdTodo);
  }

  @Put(':id')
  async updateTodo(
    @Res() res,
    @Param('id') id: string,
    @Body() todoDto: CreateTodoDto,
  ) {
    const updatedTodo = await this.todoService.update(id, todoDto);
    if (!updatedTodo) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Item Not Found',
        },
        404,
      );
    }
    return res.status(HttpStatus.OK).json(updatedTodo);
  }

  @Delete(':id')
  async removeTodo(@Res() res, @Param('id') id: string) {
    await this.todoService.remove(id);
    return res.status(HttpStatus.OK).json({
      message: 'The todo has been successfully deleted',
    });
  }
}
