import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  userName!: string | null;
  userStatus!: string | null;
  userEmail!: string | null;
  productCount: number = 0;

  isMobileMenuOpen = false;
  isUserMenuOpen = false;

  constructor(
    public _AuthService: AuthService,
    private _FlowbiteService: FlowbiteService,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.userName = localStorage.getItem('userName');
      this.userStatus = localStorage.getItem('userStatus');
      this.userEmail = localStorage.getItem('userEmail');
    }

    this._FlowbiteService.loadFlowbite((flowbite) => {
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

    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('userToken')) {
        this._CartService.getLoggedUserCart().subscribe({
          next: (res) => {
            this._CartService.cartNumber.next(res.numOfCartItems);
          },
        });
      }
    }

    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.productCount = data;
      },
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
}
