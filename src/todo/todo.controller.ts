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
  Request,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './create-todo.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async retrieveTodos(@Res() res) {
    const todos = await this.todoService.getAllFromDb();
    return res.status(HttpStatus.OK).json(todos);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  async saveTodo(@Res() res, @Body() todoDto: CreateTodoDto) {
    const createdTodo = await this.todoService.add(todoDto);
    return res.status(HttpStatus.OK).json(createdTodo);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  async removeTodo(@Res() res, @Param('id') id: string) {
    await this.todoService.remove(id);
    return res.status(HttpStatus.OK).json({
      message: 'The todo has been successfully deleted',
    });
  }
}
