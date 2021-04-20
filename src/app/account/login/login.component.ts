import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserInterface } from '@core/interfaces/user.interface';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  formSubmitting = false;
  message = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.loggedOut) {
        this.message = 'You have been logged out.';
      }
    });

    this.formLogin = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  onLogin(): any {
    if (this.formLogin.invalid) {
      return false;
    }
    this.formSubmitting = true;
    const user: UserInterface = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
      returnSecureToken: true
    };
    console.log(this.formLogin);
    console.log(this.formLogin.value);

    this.authService.login(user).subscribe((response) => {
      console.log(response);
      this.formLogin.reset();
      this.router.navigate(['/admin-task']);
      this.formSubmitting = false;
    }, () => {
      this.formSubmitting = false;
    });

  }

}
