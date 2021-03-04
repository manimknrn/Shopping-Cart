import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../models/product.model";
import { delay } from "rxjs/operators";

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProductList() {
    return this.http.get<Product[]>(`./assets/products.json`).pipe(delay(1000));
  }
}