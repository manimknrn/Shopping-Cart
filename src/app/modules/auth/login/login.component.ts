import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { AuthService } from "../services/auth.service";
import { Creds } from "../model/auth.model";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  loginValidation!: FormGroup;
  public subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.login = this.fb.group({
      email: this.fb.control(""),
      password: this.fb.control("")
    });

    this.loginValidation = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  submit() {
    this.subscriptions.add(
    this.authService.login(this.login.value as Creds).subscribe(() => {
      this.router.navigate(["/home"]);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
