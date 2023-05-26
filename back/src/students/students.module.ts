import { Module } from '@nestjs/common';
import { SupabaseModule } from 'src/supabase/supabase.module';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [SupabaseModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
