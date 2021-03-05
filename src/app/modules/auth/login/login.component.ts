import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Creds } from "../state/auth.model";
import { AuthService } from "../state/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  loginValidation!: FormGroup;

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
    this.authService.login(this.login.value as Creds).subscribe(() => {
      this.router.navigate(["/home"]);
    });
  }
}
