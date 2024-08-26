import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product!: product;
  isLoading: boolean = false;

  constructor(
    private _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute
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
}
