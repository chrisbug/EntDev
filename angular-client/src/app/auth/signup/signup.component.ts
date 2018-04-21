import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loading = false;
  error = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService
            ) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authenticationService.signup(email, password)
      .subscribe(result => {
          // login successful
          this.authenticationService.login(email, password).subscribe(
            res => {
              this.authenticationService.setToken(res);
              this.userService.getUserByEmail(email)
                .subscribe(response => {
                  this.userService.setUser(response);
                  this.router.navigate(['/']);
                });
            });
          }, (err) => {
          // any failure
          this.error = 'email or password incorrect please try again';
          this.loading = false;
        });
  }

}
