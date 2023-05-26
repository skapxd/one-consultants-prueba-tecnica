import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/students (GET)', () => {
    return request(app.getHttpServer()).get('/students').expect(200).expect([]);
  });

  it('/students (POST)', async () => {
    const resp = await request(app.getHttpServer())
      .post('/students')
      .send({ abc: 'avc' })
      .set('Content-Type', 'application/json');
    expect(resp.status).toBe(201);
  });
});
