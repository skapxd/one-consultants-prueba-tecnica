import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class User {
  @IsEmail()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
}

class Academic {
  @IsString()
  course: string;
  @IsString()
  year: string;
  @IsString()
  period: string;
  @IsString()
  teacher: string;
}

export class CreateStudentDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  user: User;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Academic)
  academic: Academic;
}
