import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs: Subscription
  ingresosSubs: Subscription
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoServide: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.userSubs = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      ).subscribe(({ user }) => {
        this.ingresosSubs = this.ingresoEgresoServide.ingresoEgresoListener(user.uid)
        .subscribe(ingresosEgresosFB => {
            this.store.dispatch(setItems({ items: ingresosEgresosFB }))
          })
      })
  }

  ngOnDestroy(): void {
    this.ingresosSubs?.unsubscribe()
    this.userSubs?.unsubscribe()
  }

}
