import { Request } from 'express';

export class UserRequest {
  public id: number;

  public proUser: boolean;

  public teacherUser: boolean;
}

export interface RequestC extends Request {
  user: UserRequest;
}
