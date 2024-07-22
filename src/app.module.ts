import { Module } from '@nestjs/common';
import { BooksModule } from './domain/books/books.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [DatabaseModule, BooksModule],
})
export class AppModule {}
