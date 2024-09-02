import { Component, OnInit } from '@angular/core';
import { Data } from '../../../shared/interfaces/wishlist';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  data: Data[] = [];
  isLoading: boolean = false;
  errMsg!: string;
  wishlistCount!: number;

  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/cart');
    }

    this.getLoggedUserWishlist();
  }

  getLoggedUserWishlist() {
    this.isLoading = true;
    this._WishlistService.getLoggedUserWishlist().subscribe({
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

  addProductToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        // console.log(res);
        if ('status' in res) {
          this._CartService.cartNumber.next(res.numOfCartItems);
          this.toastr.success(res.message, res.status, {
            progressBar: true,
          });
          this.removeProductFromWishlist(productId);
        }
      },
    });
  }

  removeProductFromWishlist(productId: string) {
    this._WishlistService.removeProductFromCart(productId).subscribe({
      next: (res) => {
        // console.log(res);
        this.toastr.warning(res.message, res.status, {
          progressBar: true,
        });
        this._WishlistService.getLoggedUserWishlist().subscribe({
          next: (res) => {
            this.wishlistCount = res.count;
            this.data = res.data;
          },
        });
      },
    });
  }
}
