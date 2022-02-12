import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = []
  detalleSubs: Subscription
  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.detalleSubs = this.store.select('ingresoEgreso')
      .subscribe(({ items }) => {
        this.ingresosEgresos = items
      })
  }

  ngOnDestroy(): void {
    this.detalleSubs.unsubscribe()
  }

  borrar(uid) {
    this.ingresoEgresoService.borrarItem(uid)
      .then(() => Swal.fire('Borrado', 'ItemBorrado', 'warning'))
      .catch(err => Swal.fire('Error', err.message, 'error'))
  }

}
