import { Component, OnInit } from '@angular/core';

import { AddressSelector } from 'src/app/store/selectors/address.selector';
import { CartItem } from '../cart/models/cart.model';
import { CartSelector } from 'src/app/store/selectors/cart.selector';
import { Observable } from 'rxjs';
import { Product } from '../product/models/product.model';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Select(AddressSelector.addressList)
  addresses$?: Observable<[]>;

  displayedColumns: string[] = ['image_url', 'name'];
  public ELEMENT_DATA: CartItem[];
  public dataSource: any;

  public isCart: boolean = false;

  public totalPrice = 0;

  date!: any;
  address: any;

  @Select(CartSelector.cartItems) cart$?: Observable<(CartItem & Product)[]>;

  @Select(CartSelector.cartTotal) total$?: Observable<number>;

  constructor() { 
    this.date = new Date();
    this.addresses$?.subscribe(res => {
      this.address = Object.values(res)
    })

    this.ELEMENT_DATA = [];
    this.cart$?.subscribe(res => {
      this.ELEMENT_DATA = res;
      this.dataSource = this.ELEMENT_DATA
      if (res) {
        res.find(res => {
          if (res.name.length > 1) {
            this.isCart = true;
          }
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
