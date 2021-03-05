import { Injectable } from "@angular/core";
import { createEmptyUser, User } from "./auth.model";
import { StoreConfig } from "@datorama/akita";
import { Store } from "@datorama/akita";
export const initialState: User = createEmptyUser();

@Injectable({
  providedIn: "root"
})
@StoreConfig({
  name: "auth"
})
export class AuthStore extends Store<User> {
  constructor() {
    super(initialState);
  }
}
