import { Component } from "@angular/core";
import { BnNgIdleService } from "bn-ng-idle";
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title: any = 'Shopping Cart';
  constructor(private bnIdle: BnNgIdleService, public dialog: MatDialog) {
    this.sessionWatching();
  }

  sessionWatching() {
    this.bnIdle.startWatching(300).subscribe((res) => {
      if (res) {
        this.openDialog();
      }
    })
  }

  openDialog() {
    this.bnIdle.stopTimer();
    this.dialog.open(Dialog);
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './modules/auth/session.html'
})
export class Dialog {

  constructor(public dialog: MatDialog, private router: Router) {}
  closeDialog() {
    this.dialog.closeAll();
    this.router.navigate(['/login']);
  }
}
