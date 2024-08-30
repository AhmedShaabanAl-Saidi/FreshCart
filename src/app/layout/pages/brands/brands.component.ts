import { Component, OnInit } from '@angular/core';
import { Brands } from '../../../shared/interfaces/brands';
import { BrandsService } from '../../../shared/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  brandsList!: Brands[];
  isLoading: boolean = false;

  constructor(private _BrandsService: BrandsService) {}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/brands');
    }

    this.getAllBrands();
  }

  getAllBrands() {
    this.isLoading = true;
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
        // console.log(this.brandsList);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        // console.log(err);
      },
    });
  }
}
