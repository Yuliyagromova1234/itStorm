import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserInfoType} from "../../../../types/user-info.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {style} from "@angular/animations";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService, private router: Router,
              private _snackBar: MatSnackBar) {
    this.isLogged = this.authService.getIsLogged();
    this.userName = localStorage.getItem('userName') || 'Пользователь';
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((statusLogin) => {
      this.isLogged = statusLogin;

      if (statusLogin) {
        this.authService.getUserInfo().subscribe((userInfoResponse: UserInfoType | DefaultResponseType) => {
          const userInfo = userInfoResponse as UserInfoType;
          if (userInfo && userInfo.name) {
            localStorage.setItem('userName', userInfo.name);
            this.userName = userInfo.name;
          } else {
            this.doLogout();
          }
        });
      }
    });
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      })
  }

  doLogout(): void {
    this.authService.removeTokens();
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }

}
