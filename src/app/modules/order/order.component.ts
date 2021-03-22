import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AddressSelector } from 'src/app/store/selectors/address.selector';
import { CartItem } from '../cart/models/cart.model';
import { OrderSelector } from 'src/app/store/selectors/order.selector';
import { PaymentService } from '../payment/services/payment.services';
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
  date!: any;
  address: any;
  orderEmptyMessage: string = 'Oh ho! Your Order is empty!!';
  public subscriptions = new Subscription();

  @Select(OrderSelector.cartItems) cart$?: Observable<(CartItem & Product)[]>;

  @Select(OrderSelector.finalCartTotal) finalTotal$?: Observable<number>;

  constructor(readonly paymentService: PaymentService) {

    this.date = new Date();
    this.subscriptions.add(
      this.addresses$?.subscribe(res => {
        this.address = Object.values(res)
      }));
    this.ELEMENT_DATA = [];
    this.subscriptions.add(
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
      }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
