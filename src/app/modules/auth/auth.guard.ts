import { Router } from "@angular/router";
import { AuthQuery } from "./state/auth.query";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthGuard {
  constructor(private router: Router, private authQuery: AuthQuery) {}

  canActivate(): boolean {
    if (this.authQuery.isLoggedIn()) {
      return true;
    }

    this.router.navigateByUrl("login");
    return false;
  }
}
