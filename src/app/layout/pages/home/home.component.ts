import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { CategorysliderComponent } from '../../additions/categoryslider/categoryslider.component';
import { HomesliderComponent } from '../../additions/homeslider/homeslider.component';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CategorysliderComponent,
    HomesliderComponent,
    RouterLink,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  productList!: product[];
  isLoading: boolean = false;
  userInput: string = '';

  constructor(
    private _ProductService: ProductService,
    private toastr: ToastrService,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/home');
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
          this.toastr.success(res.message, res.status, {
            progressBar: true,
          });
        }
      },
    });
  }
}
