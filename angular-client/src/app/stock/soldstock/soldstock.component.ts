import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';

@Component({
  selector: 'app-soldstock',
  templateUrl: './soldstock.component.html',
  styleUrls: ['./soldstock.component.css']
})
export class SoldstockComponent implements OnInit {
  user: User;

  constructor(
    private userS: UserService,
  ) { }

  ngOnInit() {
    this.user = this.userS.getCurrentUser();
  }

}
