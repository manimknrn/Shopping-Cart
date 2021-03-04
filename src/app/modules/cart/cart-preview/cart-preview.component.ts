import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Product } from 'src/app/modules/product/models/product.model';
import { AddProductToCart } from 'src/app/modules/cart/store/cart.actions';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss']
})
export class CartPreviewComponent implements OnInit {
  public previewValues!: any;
  public quant!: number;

  constructor(private route: ActivatedRoute, private _snackBar: MatSnackBar, private store: Store) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.previewValues = params;
      this.quant = params.quantity;
    });
  }

  onAddToCart({ id }: Product, qu: number): void {
    this._snackBar.open('Item added to Cart', 'Close', {
      duration: 2000,
    });
    this.store.dispatch(new AddProductToCart(Number(id), Number(qu)));
  }

}
