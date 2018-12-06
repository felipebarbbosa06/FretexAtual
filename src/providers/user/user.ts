import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/users/index';


@Injectable()
export class UserProvider {
  
  user: UserModel
  userFire
  
  constructor(public http: HttpClient) {
    this.user = new UserModel();
  }

}
