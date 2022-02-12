import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): unknown {
    return items.sort((a, b) => {
      if (a.tipo === 'ingreso') {
        return -1
      } else return 1
    });
  }

}
