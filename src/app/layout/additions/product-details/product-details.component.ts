import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product!: product;
  isLoading: boolean = false;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };

  constructor(
    private _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    this.isLoading = true;
    let id: string = '';
    this._ActivatedRoute.params.subscribe({
      next: (pram) => {
        id = pram['id'];
      },
    });

    this._ProductService.getProductById(id).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.product = res.data;
        // console.log(res.data);
      },
      error: (err) => {
        this.isLoading = false;
        // console.log(err);
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
