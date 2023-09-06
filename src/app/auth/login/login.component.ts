import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
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

  loginForm: LoginForm = this.#fb.group({
    username: ['', [Validators.required, Validators.minLength(3)] ],
    password: ['', [Validators.required, Validators.minLength(6)] ],
  })

  login() {
    console.log(this.loginForm.getRawValue());

    this.#authService.login(this.loginForm.getRawValue())
  }


}
