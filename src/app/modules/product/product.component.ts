import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';
import { AddProductToCart } from '../cart/store/cart.actions';
import { LoadProducts } from './store/product.actions';
import { ProductState } from './store/product.state';
import { ProductSelector } from './store/product.selector';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  // public quantity: Product["quantity"] = 0;
  @ViewChild('myDiv') myDiv!: ElementRef;

  @Select(ProductSelector.products)
  products$?: Observable<Product[]>;

  @Select((state: any) => state.productState.loading)
  loading$?: Observable<boolean>;

  product$?: Observable<Product>;

  constructor(private store: Store, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadProducts());

    this.product$ = this.store.select(ProductSelector.selectedProduct);
  }

  onAddToCart({ id, quantity }: Product): void {
    console.log('id : ', typeof(id) + ' ' + 'qty: ', typeof(quantity));

    this._snackBar.open('Item added to Cart', 'Close', {
      duration: 2000,
    });
    this.store.dispatch(new AddProductToCart(id, quantity));
  }

  preview(src: any) {
    let data = {
      w: 500,
      h: 500
    }

    let chk = {
      left: Number((screen.width - data.w) / 2),
      tops: Number((screen.height - data.h) / 2)
    }

    window.open(src.target.src, '_blank', 'height=' + data.h + ',width=' + data.w + ',top=' + chk.tops + ',left=' + chk.left);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

}
