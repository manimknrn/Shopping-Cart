import { AddProductToCart, RemoveCartItems } from '../../store/actions/cart.actions';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/util/confirm-dialog/confirm-dialog.component';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { CartItem } from './models/cart.model';
import { CartSelector } from '../../store/selectors/cart.selector';
import { CartService } from './services/cart.service';
import { CartState } from 'src/app/store/states/cart.state';
import { FinalTotal } from 'src/app/store/actions';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../product/models/product.model';
import { ProductsService } from '../product/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['quantity', 'image_url', 'name', 'price', 'subTotal', 'remove'];
  public ELEMENT_DATA: CartItem[];
  public dataSource: any;
  public isCart: boolean = false;
  public totalPrice = 0;
  coupon: number = 0;
  cartEmptyMessage: string = 'Oh ho! Your Basket is empty!!';

  @ViewChild('myInput')
  myInput!: ElementRef;

  public cartQuantity: any;
  public subscriptions = new Subscription();

  @Select(CartSelector.cartItems) cart$?: Observable<(CartItem & Product)[]>;

  @Select(CartSelector.cartTotal) total$?: Observable<number>;

  constructor(public dialog: MatDialog, private store: Store, readonly cartService: CartService, readonly productsService: ProductsService, private _snackBar: MatSnackBar) {
    let cartItems: any = this.store.select(CartState);
    this.subscriptions.add(
      cartItems.subscribe((res: any) => {
        this.cartQuantity = res.cartItems
      }))
    this.subscriptions.add(
      this.total$?.subscribe(res => {
        this.totalPrice = res;
        // this.store.dispatch(new FinalTotal(this.totalPrice));
      }))
    this.ELEMENT_DATA = [];
    this.subscriptions.add(
      this.cart$?.subscribe(res => {
        this.ELEMENT_DATA = res;
        this.dataSource = [...this.ELEMENT_DATA]
        this.dataSource.forEach((res: any) => {
          this.cartQuantity.forEach((resp: any) => {
            if (res.productId === resp.productId) {
              return res.quantity = resp.quantity;
            }
          })
        })
        if (res) {
          res.find(res => {
            if (res.name.length > 1) {
              this.isCart = true;
            }
          })
        }
      }))
  }

  ngOnInit(): void {
  }

  onDelete(productId: number) {
    const message = `Are you sure you want to delete?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.store.dispatch(new RemoveCartItems(productId));
        }
      }));
  }

  increment(quantity: any, i: number) {
    let num: number = quantity + 1;
    this.store.dispatch(new AddProductToCart(this.dataSource[i].productId, num))
    this.dataSource[i].quantity = num;
    this.coupon = 0;
    this.myInput.nativeElement.value = 0;
    this.subscriptions.add(
      this.total$?.subscribe(res => {
        this.totalPrice = res;
        this.store.dispatch(new FinalTotal(this.totalPrice));
      }));
  }

  decrement(quantity: any, i: number) {
    if (quantity !== 1) {
      let num: number = quantity - 1;
      this.store.dispatch(new AddProductToCart(this.dataSource[i].productId, num));
      this.dataSource[i].quantity = num;
      this.coupon = 0;
      this.myInput.nativeElement.value = 0;
      this.subscriptions.add(
        this.total$?.subscribe(res => {
          this.totalPrice = res;
          this.store.dispatch(new FinalTotal(this.totalPrice));
        }));
    }
  }

  applyCoupon() {
    let value = this.myInput.nativeElement.value;
    if (value >= this.totalPrice / 2) {
      this._snackBar.open('Coupon Invalid', 'Close', {
        duration: 2000,
      });
    } else {
      this.coupon = value;
      this.totalPrice = this.totalPrice - value;
      this.store.dispatch(new FinalTotal(this.totalPrice));
      this._snackBar.open('Coupon Applied', 'Close', {
        duration: 1000,
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
