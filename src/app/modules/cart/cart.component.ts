import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartItem } from './models/cart.model';
import { Product } from '../product/models/product.model';
import { CartService } from './services/cart.service';
import { AddProductToCart, RemoveCartItems, UpdateCartItems } from './store/cart.actions';
import { CartSelector } from './store/cart.selector';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['quantity', 'image_url', 'name', 'price', 'remove'];
  public ELEMENT_DATA: CartItem[];
  public dataSource: any;

  public isCart: boolean = false;

  public totalPrice: any;

  @Select(CartSelector.cartItems) cart$?: Observable<(CartItem & Product)[]>;

  @Select(CartSelector.cartTotal) total$?: Observable<number>;

  // product$?: Observable<Product>;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute, readonly cartService: CartService) {
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
    // this.product$ = this.store.select(ProductState.selectedProduct);
  }

  onDelete(productId: number) {
    this.store.dispatch(new RemoveCartItems(productId));
  }

  totalChange(id: Product["id"], qty: number) {

    console.log('id :: ', id + ' ' + 'qty :: ', qty);
    
    this.totalPrice = this.dataSource.reduce((a: any, b: any) => {
     return a + b.total
    }, 0);

    // this.store.dispatch(new UpdateCartItems(Number(id), qty));
  }

  selectedRow(row: any) {
    this.router.navigate(['../cartPreview'], { queryParams: row, skipLocationChange: true  });
  }

  click(e: any) {
    console.log('e :: ', e.onkeyup);
    
  }
}
