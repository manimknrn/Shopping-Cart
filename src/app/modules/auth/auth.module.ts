import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth.guard";

export const ROUTES: Routes = [
  {
    path: "",
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule {}
