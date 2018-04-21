import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  toggleMenu = false;
  constructor(
    public authservice: AuthenticationService,
    private userS: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.toggleMenu = false;
  }

  onToggleMenu() {
    if (this.toggleMenu) {
      this.toggleMenu = false;
    } else { this.toggleMenu = true; }
  }

  onLogout() {
    this.authservice.logout();
    this.userS.user = null;
    this.router.navigate(['/login']);
  }
}
