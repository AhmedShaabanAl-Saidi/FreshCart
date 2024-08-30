import { Component, OnInit } from '@angular/core';
import { CatgeoryService } from '../../../shared/services/catgeory/catgeory.service';
import { category } from '../../../shared/interfaces/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  categoryList!: category[];
  SubcategoryList!: category[];
  isLoading: boolean = false;

  constructor(private _CatgeoryService: CatgeoryService) {}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/categories');
    }

    this.getAllCategories();
  }

  getAllCategories() {
    this.isLoading = true;
    this._CatgeoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
        // console.log(this.categoryList);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        // console.log(err);
      },
    });
  }

  getAllSubCategories(catgeoryId:string) {
    this._CatgeoryService.getAllSubCategories(catgeoryId).subscribe({
      next: (res) => {
        this.SubcategoryList = res.data;
        // console.log(this.categoryList);
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
}
