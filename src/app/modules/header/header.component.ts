import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartItem } from '../cart/models/cart.model';
import { Product } from '../product/models/product.model';
import { CartState } from '../cart/store/cart.state';
import { CartSelector } from '../cart/store/cart.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Select(CartSelector.cartItems) cart$?: Observable<(CartItem & Product)[]>;
  public cartCount: number = 0;

  constructor() {
    this.cart$?.subscribe(res => {
      if (res) {

        this.cartCount = res.reduce((a: any, b: any) => {
          return a + b.quantity
        }, 0)
      }
    })
  }

  ngOnInit(): void {
  }

}
