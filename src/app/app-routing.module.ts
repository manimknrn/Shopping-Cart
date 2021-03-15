import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './modules/cart/cart.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AddressComponent } from './modules/address/address.component';
import { ProductComponent } from './modules/product/product.component';
import { PaymentComponent } from './modules/payment/payment.component';
import { ProductPreviewComponent } from './modules/product/product-preview/product-preview.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthGuard } from './modules/auth/model/auth.guard';
import { OrderComponent } from './modules/order/order.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'product', component: ProductComponent },
  { path: 'home', component: DashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'address', component: AddressComponent },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'productPreview', component: ProductPreviewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'orders', component: OrderComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {
}
