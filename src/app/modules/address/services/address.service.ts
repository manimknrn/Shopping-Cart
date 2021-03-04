import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { delay } from "rxjs/operators";

@Injectable()
export class AddressService {
  constructor(private http: HttpClient) {}

  getCountryList() {
    return this.http.get(`../assets/countries.json`).pipe(delay(1000));
  }
}