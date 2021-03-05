import { Injectable } from '@angular/core';
import { Creds, User } from './auth.model';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const user: User = {
  id: 1,
  firstName: 'Chris',
  lastName: 'Cooper',
  token: 'token'
};

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  login(creds: Creds) {
    return timer(10).pipe(mapTo(user));
  }

  
}