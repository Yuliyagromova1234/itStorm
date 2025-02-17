import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {SignupResponseType} from "../../../../types/signup-response.type";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[А-ЯЁ][а-яё]*(\s[А-ЯЁ][а-яё]*)*$/)]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
    agree: [false, [Validators.requiredTrue]]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
              private _snackBar: MatSnackBar) {
  }

  signUp() {
    if (this.signupForm.valid && this.signupForm.value.name && this.signupForm.value.email && this.signupForm.value.password && this.signupForm.value.agree) {
      this.authService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password)
        .subscribe({
          next: (data: DefaultResponseType | SignupResponseType) => {
            const defaultResponse = data as DefaultResponseType;
            const signupResponse = data as SignupResponseType;
            let error = null;

            if (defaultResponse.error) {
              error = defaultResponse.message;
            }
            if (!signupResponse.accessToken || !signupResponse.refreshToken || !signupResponse.userId) {
              error = 'Ошибка авторизации'
            }
            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }
            this.authService.setTokens(signupResponse.accessToken, signupResponse.refreshToken);
            this.authService.userIdKey = signupResponse.userId;
            this._snackBar.open('Успешная регистрация');
            this.router.navigate(['/']);
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка регистрации');
            }
          }
        })
    } else {
      this.signupForm.markAllAsTouched();
      this._snackBar.open('Заполните все обязательные поля');
    }
  }
}
