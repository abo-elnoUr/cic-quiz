import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, ILoginResponse } from 'src/app/models/auth/login.model';

const api = 'http://localhost:3000/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)

  login(credintial: ILogin) {
    return this.http.get<ILoginResponse>(api).subscribe({
      next: (res) => {
        if(credintial?.username == res?.user?.username && credintial?.password == res?.user?.password) {
          console.log('logged in');
          localStorage.setItem('employeeToken', res.token)
        } else {
          console.log('not logged in');
        }
      }
    })
  }

  logout() {
    localStorage.removeItem('employeeToken')
  }

  isLoggedIn() {
    return !!localStorage.getItem('employeeToken')
  }




}
