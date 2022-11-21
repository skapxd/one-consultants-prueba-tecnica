import { Injectable } from '@nestjs/common';
import { Supabase } from 'src/supabase/supabase';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  private readonly tableName = 'students';

  constructor(private readonly supabase: Supabase) {}

  async create(createStudentDto: CreateStudentDto) {
    const resp = await this.supabase
      .getClient()
      .from(this.tableName)
      .insert({
        ...createStudentDto.user,
        ...createStudentDto.academic,
      });

    return resp;
  }

  async findAll() {
    const resp = await this.supabase.getClient().from(this.tableName).select();

    return resp;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
