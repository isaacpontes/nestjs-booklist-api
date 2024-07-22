import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateBookDTO } from 'src/domain/books/dto/create-book.dto';
import { UpdateBookDTO } from 'src/domain/books/dto/update-book.dto';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/books (GET)', () => {
        return request(app.getHttpServer())
            .get('/books')
            .expect(200)
            .expect([]);
    });

    it('/books (POST)', () => {
        const createBookDTO: CreateBookDTO = { title: 'New Book', pages: 123 };
        return request(app.getHttpServer())
            .post('/books')
            .send(createBookDTO)
            .expect(201)
            .expect((res) => {
                expect(res.body).toHaveProperty('id');
                expect(res.body.title).toBe(createBookDTO.title);
                expect(res.body.pages).toBe(createBookDTO.pages);
            });
    });

    it('/books/:id (GET)', async () => {
        const createBookDTO: CreateBookDTO = { title: 'New Book', pages: 123 };
        const server = app.getHttpServer();
        const creationResponse = await request(server).post('/books').send(createBookDTO);

        const bookId = creationResponse.body.id;

        const response = await request(server).get(`/books/${bookId}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(bookId);
        expect(response.body.title).toBe(createBookDTO.title);
        expect(response.body.pages).toBe(createBookDTO.pages);
    });

    it('/books/:id (PUT)', async () => {
        const createBookDTO: CreateBookDTO = { title: 'New Book', pages: 123 };
        const response = await request(app.getHttpServer())
            .post('/books')
            .send(createBookDTO);

        const bookId = response.body.id;
        const updateBookDTO: UpdateBookDTO = {
            title: 'Updated Book',
            pages: 456,
        };

        return request(app.getHttpServer())
            .put(`/books/${bookId}`)
            .send(updateBookDTO)
            .expect(200)
            .expect((res) => {
                expect(res.body.id).toBe(bookId);
                expect(res.body.title).toBe(updateBookDTO.title);
                expect(res.body.pages).toBe(updateBookDTO.pages);
            });
    });

    it('/books/:id (DELETE)', async () => {
        const createBookDTO: CreateBookDTO = { title: 'New Book', pages: 123 };
        const response = await request(app.getHttpServer())
            .post('/books')
            .send(createBookDTO);

        const bookId = response.body.id;

        return request(app.getHttpServer())
            .delete(`/books/${bookId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.id).toBe(bookId);
                expect(res.body.title).toBe(createBookDTO.title);
                expect(res.body.pages).toBe(createBookDTO.pages);
            });
    });
});
