import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './modules/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsService } from './modules/product/services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { ShopState } from './store/actions';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HeaderComponent } from './modules/header/header.component';
import { CartService } from './modules/cart/services/cart.service';
import { AddressComponent } from './modules/address/address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductPreviewComponent } from './modules/product/product-preview/product-preview.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaymentComponent } from './modules/payment/payment.component';
import { CartComponent } from './modules/cart/cart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddressService } from './modules/address/services/address.service';
import { LoginComponent } from './modules/auth/login/login.component';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { BnNgIdleService } from 'bn-ng-idle';
import { ConfirmDialogComponent } from './util/confirm-dialog/confirm-dialog.component';
import { OrderComponent } from './modules/order/order.component';
import { PaymentService } from './modules/payment/services/payment.services';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductComponent,
    DashboardComponent,
    HeaderComponent,
    AddressComponent,
    ProductPreviewComponent,
    PaymentComponent,
    LoginComponent,
    ConfirmDialogComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot(ShopState),
    NgxsResetPluginModule.forRoot(),
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatBadgeModule,
    FormsModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    ScrollingModule,
    MatProgressSpinnerModule
  ],
  providers: [ProductsService, CartService, AddressService, BnNgIdleService, PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
