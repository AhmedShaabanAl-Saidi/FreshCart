import { Component, OnInit } from '@angular/core';
import { product } from '../../../shared/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  productList!: product[];
  isLoading: boolean = false;
  userInput: string = '';

  wishlistData:string[] =[];


  constructor(
    private _ProductService: ProductService,
    private toastr: ToastrService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/products');
    }

    this.getAllProducts();
  }

  getAllProducts() {
    this.isLoading = true;
    this._ProductService.getAllProduct().subscribe({
      next: (res) => {
        this.productList = res.data;
        // console.log(this.productList);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  addProductToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        // console.log(res);
        if ('status' in res) {
          this._CartService.cartNumber.next(res.numOfCartItems);
          // console.log(this._CartService.cartNumber);

          this.toastr.success(res.message, res.status, {
            progressBar: true,
          });
        }
      },
    });
  }

  addProductToWishlist(productId: string) {
    this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        // console.log(res);
        if ('status' in res) {
          this.toastr.success(res.message, res.status, {
            progressBar: true,
          });
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
      },
    });
  }
}
