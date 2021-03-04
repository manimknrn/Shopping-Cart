import { Component, OnInit } from '@angular/core';
import { AddressService } from './services/address.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  public names: any;
  userAddressValidations!: FormGroup;
  matcher = new CrossErrorStateMatcher();

  constructor(private addressService: AddressService, private formBuilder: FormBuilder, private router: Router) {
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
    this.router.navigate(['../payment'], { queryParams: row.value });
  }
}

export class CrossErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): any {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid);
  }
}
