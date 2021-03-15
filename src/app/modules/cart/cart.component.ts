import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartItem } from './models/cart.model';
import { Product } from '../product/models/product.model';
import { CartService } from './services/cart.service';
import { AddProductToCart, RemoveCartItems } from '../../store/actions/cart.actions';
import { CartSelector } from '../../store/selectors/cart.selector';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/util/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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

  @Select(CartSelector.cartItems) cart$?: Observable<(CartItem & Product)[]>;
  
  @Select(CartSelector.cartTotal) total$?: Observable<number>;

  constructor(public dialog: MatDialog, private store: Store, private router: Router, private route: ActivatedRoute, readonly cartService: CartService, readonly productsService: ProductsService) {

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

  onDelete(productId: number) {
    const message = `Are you sure you want to delete?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(new RemoveCartItems(productId));
      }
    });
  }

  increment(quantity: any, i: number) {
    let num: number = quantity + 1;
    this.store.dispatch(new AddProductToCart(this.dataSource[i].productId, num))
    this.dataSource[i].quantity = num;
  }

  decrement(quantity: any, i: number) {
    if (quantity !== 1) {
      let num: number = quantity - 1;
      this.store.dispatch(new AddProductToCart(this.dataSource[i].productId, num))
      this.dataSource[i].quantity = num;
    }
  }
}
