import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Data } from '../../../shared/interfaces/cart';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  data!: Data;
  isLoading: boolean = false;
  errMsg!: string;

  constructor(private _CartService: CartService,private toastr: ToastrService, private _Router: Router) {}

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
      error: (err) => {
        this.errMsg = err.error.message;
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
        this.toastr.warning("Product Removed Successfully From Your Cart", res.status, {
          progressBar: true,
        });
        this.data = res.data;
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
    });
  }

  clearCart(): void {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        // console.log(res);
        this._CartService.cartNumber.next(0);
        this.toastr.warning("Cart Removed Successfully", "", {
          progressBar: true,
        });
        this._Router.navigate(['/home']);
      },
      error : err => {
        console.log(err);
      }
    });
  }
}
