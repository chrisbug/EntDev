import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { Group } from '../../_models/group.model';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getUser();
  }

}
