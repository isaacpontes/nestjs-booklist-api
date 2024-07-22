import { Global, Module, Provider } from '@nestjs/common';
import { BooksMemoryRepository } from './books/books-memory.repository';
import { BooksRepository } from '../../domain/books/repositories/books-repository';

const BooksMemoryRepositoryProvider: Provider = {
    provide: BooksRepository,
    useClass: BooksMemoryRepository,
};

@Global()
@Module({
    providers: [BooksMemoryRepositoryProvider],
    exports: [BooksMemoryRepositoryProvider],
})
export class DatabaseModule {}
