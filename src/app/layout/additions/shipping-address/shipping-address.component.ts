import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../shared/services/order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss',
})
export class ShippingAddressComponent {
  isLoading: boolean = false;

  shippingAddressForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required,Validators.pattern(/^(.*[a-zA-Z]){10,}.*$/),]),
    phone: new FormControl(null, [Validators.required,Validators.pattern(/^(?:\+20|0)?1[0125]\d{8}$/),]),
    city: new FormControl(null, [Validators.required,Validators.pattern(/^(.*[a-zA-Z]){10,}.*$/),]),
  });

  constructor(
    private _OrderService: OrderService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  submitSippingAddressForm() {
    if (this.shippingAddressForm.valid) {
      this.isLoading = true;

      this._ActivatedRoute.paramMap.subscribe({
        next: (parm) => {
          this._OrderService
            .checkOut(parm.get('cartId')!, this.shippingAddressForm.value)
            .subscribe({
              next: (res) => {
                this.isLoading = false;

                if ('session' in res) {
                  window.open(res.session.url, '_self');
                }
              },
            });
        },
      });
    }
  }
}
