import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartItem } from '../cart/models/cart.model';
import { Product } from '../product/models/product.model';
import { CartSelector } from '../cart/store/cart.selector';
import { AuthService } from '../auth/state/auth.service';
import { AuthQuery } from '../auth/state/auth.query';
import { Router } from '@angular/router';
import { StateResetAll } from 'ngxs-reset-plugin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$ = this.authQuery.isLoggedIn$;
  isLoggedIn!: boolean;

  @Select(CartSelector.cartItems) cart$?: Observable<(CartItem & Product)[]>;
  public cartCount: number = 0;

  constructor(private authQuery: AuthQuery,
    private authService: AuthService,
    private router: Router,
    private store: Store) {
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

  onLogout() {
    this.store.dispatch(new StateResetAll());
    this.authService.logout();
    this.router.navigate(["login"]);
  }

}
