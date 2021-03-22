import { BnNgIdleService } from "bn-ng-idle";
import { Component } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title: any = 'Shopping Cart';
  public subscriptions = new Subscription();
  constructor(private bnIdle: BnNgIdleService, public dialog: MatDialog) {
    this.sessionWatching();
  }

  sessionWatching() {
    this.subscriptions.add(
    this.bnIdle.startWatching(300).subscribe((res) => {
      if (res) {
        this.openDialog();
      }
    }))
  }

  openDialog() {
    this.bnIdle.stopTimer();
    this.dialog.open(Dialog);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
