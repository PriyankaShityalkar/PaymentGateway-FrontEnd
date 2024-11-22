import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaymentServiceService } from '../../service/payment-service.service';
import { error } from 'console';
import { Router } from '@angular/router';

declare var Razorpay: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isModelOpen: boolean = false;

  constructor(private service: PaymentServiceService, private router: Router) {}
  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    contact: new FormControl(''),
    email: new FormControl(''),
    quantity: new FormControl(''),
    amount: new FormControl(''),
  });

  formSubmit() {
    console.log(this.form.value);

    this.service.Order(this.form.value).subscribe(
      (res) => {
        console.log(res);
        this.openTransactionModal(res)
        
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openTransactionModal(response: any) {
    var option = {
      orderId: response.orderId,
      key: response.access_key, // Enter the Key ID generated from the Dashboard
      amount: response.amount,
      currency: response.currency,
      name: response.fullname,
      description: 'Payment of online shops',
      image:
        'https://cdn.pixabay.com/photo/2021/07/10/14/31/online-shopping-6401553_1280.png',
      handler: (response: any) => {
        this.processResponse(response);
      },
      modal: {
        ondismiss: (res: any) => {
          this.isPaymentClosed();
          this.handlePaymentFailure();
        },
      },
      prefill: {
        name: this.form.get('fullname')?.value,
        email: this.form.get('email')?.value,
        contact: this.form.get('contact')?.value,
      },
      notes: {
        address: 'Online Shoping',
      },
      theme: {
        color: '#F37254',
      },
    };

    var razorpayOprion = new Razorpay(option);
    razorpayOprion.open();
  }

  isPaymentClosed() {
    this.isModelOpen = false;
  }

  handlePaymentFailure() {
    this.isPaymentClosed();
    this.router.navigate(['/failed']); // Navigate to failure page on payment failure
  }

  processResponse(resp: any) {}
}
