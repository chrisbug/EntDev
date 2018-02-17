import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean =false;
  error: string = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    //reset login status
    this.authenticationService.logout();
  }

  onLogin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.loading = true;
    console.log(email);
    this.authenticationService.login(email, password)
      .subscribe(result => {
        console.log(result)
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
