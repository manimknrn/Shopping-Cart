import { Injectable } from "@angular/core";
import { AuthStore } from "../../../store/auth.store";
import { AuthDataService } from "./auth-data.service";
import { createEmptyUser, Creds } from "../model/auth.model";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private authStore: AuthStore,
    private authDataService: AuthDataService
  ) {}

  login(creds: Creds) {
    return this.authDataService.login(creds).pipe(
      tap(user => {
        this.authStore.update(user);
      })
    );
  }

  logout() {
    this.authStore.update(createEmptyUser());
  }
}
