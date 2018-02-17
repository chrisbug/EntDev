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
  loading: boolean = false;
  error: string = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSignup(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    this.authenticationService.signup(email, password, firstName, lastName)
      .subscribe(result => {
        if(result === true){
          //login successful
          this.router.navigate(['/']);
        } else {
          //any failure
          this.error = 'email or password incorrect please try again';
          this.loading = false;
        }
      });
  }

}
