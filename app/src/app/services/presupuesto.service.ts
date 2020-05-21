import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { PresupuestoModule } from '../moduls/presupuesto.module';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  constructor(private http: HttpClient) { }

  getCompotentes() {
    return this.http.get(`${ environment.urlApi }/componentes`);
  }
  enviarPresupuesto(presupuesto: PresupuestoModule){
    return this.http.post(`${ environment.urlApi }/contacto`, presupuesto);
  }
}
