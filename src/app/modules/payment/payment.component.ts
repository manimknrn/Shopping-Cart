import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductState, ResetCartItems } from 'src/app/store/actions';

import { CartState } from 'src/app/store/states/cart.state';
import { CloneOrderList } from 'src/app/store/actions/order.actions';
import { CrossErrorStateMatcher } from '../address/address.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentService } from './services/payment.services';
import { StateResetAll } from 'ngxs-reset-plugin';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  favoriteSeason!: string;
  isOneVisible: boolean = false;
  isTwoVisible: boolean = false;
  spinner: boolean = false;
  seasons: string[] = ['Debit/Credit/ATM Card', 'Other UPI Apps', 'Pay on Delivery'];
  public address: any;
  paymentValidation!: FormGroup;
  matcher = new CrossErrorStateMatcher();
  @ViewChild('cardNumber') ccNumberField!: ElementRef;
  public subscriptions = new Subscription();

  constructor(public _snackBar: MatSnackBar, public router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private store: Store, readonly paymentService: PaymentService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.queryParams.subscribe(params => {
        this.address = Object.values(params)
      }));

    this.paymentValidation = this.formBuilder.group({
      cod: ['', [Validators.required]]
    });
  }

  // Credit card payment method
  cardPayment() {
    this.isOneVisible = true;
    this.isTwoVisible = false;
    this.paymentValidation = this.formBuilder.group({
      cardName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z]+')]],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(19), Validators.pattern('^[ 0-9]*$')]],
      expiryDate: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]+')]]
    });
  }

  // UPI payment method
  upiPayment() {
    this.isOneVisible = false;
    this.isTwoVisible = true
    this.paymentValidation = this.formBuilder.group({
      upi: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
    });
  }

  // Cash on Delivery
  codPayment() {
    this.isOneVisible = false;
    this.isTwoVisible = false;
    this.paymentValidation = this.formBuilder.group({
      cod: ['']
    });
  }

  // place order by clicking on button
  placeOrder() {
    this.spinner = true;
    this._snackBar.open('Order Successfully placed!!!', 'Thank you!', {
      duration: 4000
    });
    this.store.dispatch(new CloneOrderList(this.store.snapshot()));
    this.store.dispatch(new ResetCartItems());
    this.paymentService.orderPlaced$.next(true);
    setTimeout(() => {
      this.router.navigate(['../home']);
    }, 3000)
  }

  // credit card input spacing
  creditCardNumberSpacing() {
    const input = this.ccNumberField.nativeElement;
    const { selectionStart } = input;
    const { cardNumber } = this.paymentValidation.controls;

    let trimmedCardNum = cardNumber.value.replace(/\s+/g, '');

    if (trimmedCardNum.length > 16) {
      trimmedCardNum = trimmedCardNum.substr(0, 16);
    }

    /* Handle American Express 4-6-5 spacing */
    const partitions = trimmedCardNum.startsWith('34') || trimmedCardNum.startsWith('37')
      ? [4, 6, 5]
      : [4, 4, 4, 4];

    const numbers: any = [];
    let position = 0;
    partitions.forEach(partition => {
      const part = trimmedCardNum.substr(position, partition);
      if (part) numbers.push(part);
      position += partition;
    })

    cardNumber.setValue(numbers.join(' '));

    /* Handle caret position if user edits the number later */
    if (selectionStart < cardNumber.value.length - 1) {
      input.setSelectionRange(selectionStart, selectionStart, 'none');
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}


