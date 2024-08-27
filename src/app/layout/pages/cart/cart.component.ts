import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Data } from '../../../shared/interfaces/cart';
import { log } from 'console';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  data!: Data;
  isLoading: boolean = false;

  constructor(private _CartService: CartService) {}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/cart');
    }

    this.getLoggedUserCart();
  }

  getLoggedUserCart() {
    this.isLoading = true;
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.isLoading = false;
        // console.log(res.data);
        this.data = res.data;
      },
    });
  }

  updateProductCartCount(productId: string, count: number) {
    if (count <= 0) {
      this.removeProductFromCart(productId);
    } else {
      this._CartService
        .updateProductCartCount(productId, count.toString())
        .subscribe({
          next: (res) => {
            // console.log(res.data);
            this.data = res.data;
          },
        });
    }
  }

  removeProductFromCart(productId: string) {
    this._CartService.removeProductFromCart(productId).subscribe({
      next: (res) => {
        // console.log(res);
        this.data = res.data;
      },
    });
  }
}
