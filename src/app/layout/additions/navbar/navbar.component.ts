import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  userName!: string | null;
  userStatus!: string | null;
  userEmail!: string | null;
  
  constructor(public _AuthService: AuthService,private _FlowbiteService:FlowbiteService) {}

  ngOnInit(): void {

    if (typeof localStorage !== 'undefined') {
      this.userName = localStorage.getItem('userName');
      this.userStatus = localStorage.getItem('userState');
      this.userEmail = localStorage.getItem('userEmail');
    }

    this._FlowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      // console.log('Flowbite loaded', flowbite);
    });

    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
}
