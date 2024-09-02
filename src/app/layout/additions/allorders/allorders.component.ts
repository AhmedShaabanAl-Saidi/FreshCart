import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import { SuccessAllorders } from '../../../shared/interfaces/success-allorders';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  userId = localStorage.getItem('userId')!;
  isLoading: boolean = false;
  allordersList!:SuccessAllorders[]|[];


  constructor(private _OrderService: OrderService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.isLoading = true;
    this._OrderService.allOrders(this.userId).subscribe({
      next: (res) => {
        this.allordersList = res;

        this.allordersList.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        // console.log(this.allordersList);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
