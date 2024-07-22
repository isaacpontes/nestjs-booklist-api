import { Inject, Injectable } from '@nestjs/common';
import { UpdateBookDTO } from '../dto/update-book.dto';
import { CreateBookDTO } from '../dto/create-book.dto';
import { BooksRepository } from '../repositories/books-repository';

@Injectable()
export class BooksService {
    constructor(@Inject(BooksRepository) private readonly booksRepository: BooksRepository) {}

    async create(bookInput: CreateBookDTO) {
        return this.booksRepository.save(bookInput);
    }

    async findAll() {
        return this.booksRepository.findAll();
    }

    async findById(id: number) {
        return this.booksRepository.findById(id);
    }

    async update(id: number, updateBookDTO: UpdateBookDTO) {
        return this.booksRepository.update(id, updateBookDTO);
    }

    async delete(id: number) {
        return this.booksRepository.delete(id);
    }
}
