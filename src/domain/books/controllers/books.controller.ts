import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Book } from '../entities/book.entity';
import { CreateBookDTO } from '../dto/create-book.dto';
import { UpdateBookDTO } from '../dto/update-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Post()
    async create(@Body() createBookDTO: CreateBookDTO) {
        return this.booksService.create(createBookDTO)
    }

    @Get()
    async findAll(): Promise<Book[]> {
        return this.booksService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.booksService.findById(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateBookDTO: UpdateBookDTO) {
        return this.booksService.update(id, updateBookDTO)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.booksService.delete(id)
    }
}
