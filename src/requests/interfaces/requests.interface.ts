import {Document} from 'mongoose';

export interface RequestsInterface extends Document{
  readonly method: string;
  readonly path: string;
  readonly response: object;
}
