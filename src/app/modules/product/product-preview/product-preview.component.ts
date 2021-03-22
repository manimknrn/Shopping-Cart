import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AddProductToCart } from 'src/app/store/actions/cart.actions';
import { CartService } from '../../cart/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../services/products.service';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit {
  public previewValues!: any;
  public quantity: number = 1;
  previewEmptyMessage: string = 'Oh ho! Your Product Preview is empty!!';
  public subscriptions = new Subscription();

  constructor(readonly cartService: CartService, private route: ActivatedRoute, private _snackBar: MatSnackBar, private store: Store, readonly productService: ProductsService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.productService.previewItems$.subscribe(res => {
        this.previewValues = res;
      }));
  }

  increment(id: number, qty: number) {
    let num: number = this.quantity + 1;
    this.store.dispatch(new AddProductToCart(id, num));
    this.quantity++;
  }

  decrement(id: number, qty: number) {
    if (this.quantity !== 0) {
      let num: number = this.quantity - 1;
      this.store.dispatch(new AddProductToCart(id, num));
      this.quantity--;
    }
  }

  addToCart(id: number, qty: number) {
    if (this.quantity !== 0) {
      let num: number = this.quantity;
      this.store.dispatch(new AddProductToCart(id, num));
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
