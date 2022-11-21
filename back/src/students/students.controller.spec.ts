import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

describe('StudentsController', () => {
  let controller: StudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [StudentsService],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should return all students', () => {
    expect(controller.findAll().constructor.name).toBe('Array');
  });

  it('should create new student', () => {
    expect(
      controller.create({
        academic: null,
        user: null,
      }),
    ).toStrictEqual({
      academic: null,
      user: null,
    });
  });
});
