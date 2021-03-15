import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartItem } from '../cart/models/cart.model';
import { Product } from '../product/models/product.model';
import { CartSelector } from '../../store/selectors/cart.selector';
import { AuthService } from '../auth/services/auth.service';
import { AuthQuery } from '../auth/model/auth.query';
import { Router } from '@angular/router';
import { StateResetAll } from 'ngxs-reset-plugin';
import { PaymentService } from '../payment/services/payment.services';
import { CartService } from '../cart/services/cart.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$ = this.authQuery.isLoggedIn$;
  isLoggedIn!: boolean;

  @Select(CartSelector.cartQuantity) cartQuantity$?: Observable<(CartItem)[]>;
  public cartCount!: any;
  public count: number = 0;

  constructor(private authQuery: AuthQuery,
    private authService: AuthService,
    private router: Router,
    private store: Store,
    public paymentService: PaymentService,
    public cartService: CartService) {   

    this.cartQuantity$?.subscribe(res => {
      this.cartCount = res
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
