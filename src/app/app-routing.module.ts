import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './modules/cart/cart.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AddressComponent } from './modules/address/address.component';
import { ProductComponent } from './modules/product/product.component';
import { PaymentComponent } from './modules/payment/payment.component';
import { CartPreviewComponent } from './modules/cart/cart-preview/cart-preview.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'product', component: ProductComponent },
  { path: 'home', component: DashboardComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'address', component: AddressComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'cartPreview', component: CartPreviewComponent}
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
