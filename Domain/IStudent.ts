import { IAcademic } from './IAcademic';
import { IUser } from "./IUser";

export interface IStudent {
  user: IUser
  academic: IAcademic
}