import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(productList: product[], userInput: string): product[] {
    return productList.filter((item) =>
      item.title.toLocaleLowerCase().includes(userInput.toLocaleLowerCase())
    );
  }
}
