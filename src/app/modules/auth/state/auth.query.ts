import { Injectable } from "@angular/core";
import { AuthStore } from "./auth.store";
import { Query, toBoolean } from "@datorama/akita";
import { User } from "./auth.model";

@Injectable({
  providedIn: "root"
})
export class AuthQuery extends Query<User> {
  isLoggedIn$ = this.select(user => {
    return !!user.token;
  });

  constructor(protected store: AuthStore) {
    super(store);
  }

  isLoggedIn() {
    return !!this.getSnapshot().token;
  }
}
