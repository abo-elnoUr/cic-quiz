import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/models/auth/login.type';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SweetAlertService } from 'src/app/shared/services/global/sweet-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  #fb = inject(NonNullableFormBuilder)
  #authService = inject(AuthService)
  #sweetAlert = inject(SweetAlertService)
  #router = inject(Router)

  loginForm: LoginForm = this.#fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  })

  login() {
    this.#authService.getUserData().subscribe({
      next: (res) => {
        if (this.loginForm.getRawValue()?.username == res[0]?.user?.username && this.loginForm.getRawValue()?.password == res[0]?.user?.password) {
          localStorage.setItem('employeeToken', res[0].token)
          this.#sweetAlert.saveToast('login successfully')
          this.#router.navigate(['']) // this is not working and i do not know
          location.reload() // then i do this and i know is not perfect
          this.loginForm.reset()
        } else {
          this.#sweetAlert.error('username or password not correct')
          this.loginForm.reset()
        }
      }, error: (err) => {
        this.loginForm.reset()
        this.#sweetAlert.error(err)
      }
    })
  }


}
