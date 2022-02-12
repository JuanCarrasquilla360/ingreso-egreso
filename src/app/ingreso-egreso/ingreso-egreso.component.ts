import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm: FormGroup
  tipo: string = 'ingreso'
  loading: boolean
  loadingSubs: Subscription
  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    })
    this.loadingSubs = this.store.select('ui').subscribe(state => {
      this.loading = state.isLoading
    })
  }
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe()
  }
  guardar(ingresoForm) {
    this.store.dispatch(isLoading())
    if (ingresoForm.invalid) return
    const { descripcion, monto } = this.ingresoForm.value
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo)
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(res => {
      this.store.dispatch(stopLoading())
      Swal.fire('Registro Creado', descripcion, 'success')
    }).catch(err => {
      this.store.dispatch(stopLoading())
      Swal.fire('Error', err, 'error')
    })
    return ingresoForm.reset()
  }

}
