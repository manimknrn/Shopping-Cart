import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';

import { AddAddress } from 'src/app/store/actions/address.actions';
import { AddressService } from './services/address.service';
import { CartItem } from '../cart/models/cart.model';
import { CartSelector } from 'src/app/store/actions';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Product } from '../product/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  public names: any;
  userAddressValidations!: FormGroup;
  matcher = new CrossErrorStateMatcher();
  @Select(CartSelector.cartItems) cart$?: Observable<(CartItem & Product)[]>;
  
  @Select(CartSelector.cartTotal) total$?: Observable<number>;
  constructor(private addressService: AddressService, private formBuilder: FormBuilder, private router: Router, private store: Store) {
  }

  ngOnInit(): void {
    this.addressService.getCountryList()
      .subscribe(res => {
        return this.names = res;
      });

    this.userAddressValidations = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10), Validators.pattern('[a-zA-Z]+')]],
      country: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]],
      pinCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]+')]],
      address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      town: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10), Validators.pattern('[a-zA-Z]+')]],
      state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern('[a-zA-Z]+')]]
    });
  }

  proceedPayment(row: any) {
    this.store.dispatch(new AddAddress(row));
    this.router.navigate(['../payment'], { queryParams: row.value });
  }
}

export class CrossErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): any {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid);
  }
}
