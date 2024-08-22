import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-homeslider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './homeslider.component.html',
  styleUrl: './homeslider.component.scss',
})
export class HomesliderComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 10000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
}
