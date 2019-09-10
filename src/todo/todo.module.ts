import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { todoProviders } from './todo.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [TodoService, ...todoProviders],
  controllers: [TodoController],
  exports: [TodoService],
})
export class TodoModule {}
