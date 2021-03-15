import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class PaymentService {
  public orderPlaced$: BehaviorSubject<any> = new BehaviorSubject(false);
  constructor() {}
}