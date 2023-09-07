import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, ILoginResponse } from 'src/app/models/auth/login.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const api = 'http://localhost:3000/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)

  // login(credintial: ILogin){
  //   return this.http.get<ILoginResponse>(api).subscribe({
  //     next: (res) => {
  //       if(credintial?.username == res?.user?.username && credintial?.password == res?.user?.password) {
  //         console.log('logged in');
  //         localStorage.setItem('employeeToken', res.token)
  //       } else {
  //         console.log('not logged in');
  //       }
  //     }
  //   })
  // }

  getUserData(){
    return this.http.get<ILoginResponse[]>(api)
  }

  currentEmployee$: BehaviorSubject<string> = new BehaviorSubject(
    JSON.parse(localStorage.getItem("employeeToken")!) ?? null
  )

  get activeUser(): string {
    return this.currentEmployee$.value;
  }

  logout() {
    localStorage.removeItem('employeeToken')
  }

  isLoggedIn() {
    return !!localStorage.getItem('employeeToken')
  }




}
