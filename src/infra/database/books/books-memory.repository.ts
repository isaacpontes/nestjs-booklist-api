import { Injectable } from '@nestjs/common';
import { Book } from '../../../domain/books/entities/book.entity';
import { CreateBookDTO } from '../../../domain/books/dto/create-book.dto';
import { UpdateBookDTO } from '../../../domain/books/dto/update-book.dto';
import { BooksRepository } from '../../../domain/books/repositories/books-repository';

@Injectable()
export class BooksMemoryRepository implements BooksRepository {
    private readonly books: Book[] = [];
    private idSequence = 0;

    async save(bookInput: CreateBookDTO) {
        this.idSequence++;
        const newBook = { id: this.idSequence, ...bookInput };
        this.books.push(newBook);
        return newBook;
    }

    async findAll() {
        return this.books;
    }

    async findById(id: number) {
        return this.books.find((book) => book.id === id) ?? null;
    }

    async update(id: number, updateBookInput: UpdateBookDTO) {
        const bookIndex = this.books.findIndex((book) => book.id === id);
        if (bookIndex === -1) return null;
        const updatedBook = { ...this.books[bookIndex], ...updateBookInput };
        this.books[bookIndex] = updatedBook;
        return updatedBook;
    }

    async delete(id: number) {
        const index = this.books.findIndex((book) => book.id === id);
        if (index === -1) return null;
        return this.books.splice(index, 1)[0];
    }
}
