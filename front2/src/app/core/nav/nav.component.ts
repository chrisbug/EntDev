import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  toggleMenu: boolean = false;
  constructor(private authservice: AuthenticationService) { }

  ngOnInit() {
    this.toggleMenu = false;
  }

  onToggleMenu(){
    if(this.toggleMenu){
      this.toggleMenu = false;
    } else { this.toggleMenu = true}
  }

}
