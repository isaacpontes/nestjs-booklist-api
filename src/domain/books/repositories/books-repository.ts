import { CreateBookDTO } from '../dto/create-book.dto';
import { UpdateBookDTO } from '../dto/update-book.dto';
import { Book } from '../entities/book.entity';

export interface BooksRepository {
    save: (bookInput: CreateBookDTO) => Promise<Book>;

    findAll: () => Promise<Book[]>;

    findById: (id: number) => Promise<Book | null>;

    update: (
        id: number,
        updateBookInput: UpdateBookDTO,
    ) => Promise<Book | null>;

    delete: (id: number) => Promise<Book | null>;
}

export const BooksRepository: unique symbol = Symbol('BooksRepository');
