import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn} from '@angular/forms';

import { PresupuestoModule } from '../../moduls/presupuesto.module';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  m2FormGroup: FormGroup;
  tipoInmuebleFormGroup: FormGroup;
  tipoPlanFormGroup: FormGroup;
  contactoFormGroup: FormGroup;

  presupuesto: PresupuestoModule = new PresupuestoModule() ;

  get m2NoValido() {
    return this.m2FormGroup.get('m2').invalid && this.m2FormGroup.get('m2').touched;
  }
  get tipoInmuebleValido(){
    return this.tipoInmuebleFormGroup.get('tipoInmueble').invalid && this.tipoInmuebleFormGroup.get('tipoInmueble').touched;
  }
  get tipoPlanValido(){
    return this.tipoPlanFormGroup.get('tipoPlan').invalid && this.tipoPlanFormGroup.get('tipoPlan').touched;
  }
  get nombreValido(){
    return this.contactoFormGroup.get('nombre').invalid && this.contactoFormGroup.get('nombre').touched;
  }
  get emailValido(){
    return this.contactoFormGroup.get('email').invalid && this.contactoFormGroup.get('email').touched;
  }
  get telefonoValido(){
    return this.contactoFormGroup.get('telefono').invalid && this.contactoFormGroup.get('telefono').touched;
  }
  
  constructor(private _formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.m2FormGroup = this._formBuilder.group({
      m2: ['', [ Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]  ]
    });
    this.tipoInmuebleFormGroup = this._formBuilder.group({
      tipoInmueble: ['', Validators.required]
    });
    this.tipoPlanFormGroup = this._formBuilder.group({
      tipoPlan : ['', Validators.required]
    });
    this.contactoFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      email : ['', [ Validators.required, Validators.email ] ],
      telefono: ['', [ Validators.required ] ],
      termino: ['', Validators.required ]
    });
  }
  clickMt(){
    if (this.m2FormGroup.invalid) {
      return Object.values(this.m2FormGroup.controls).forEach(control => {
        if ( control instanceof FormGroup ) {
          Object.values(control.controls).forEach( data => {
            data.markAllAsTouched();
          });
        } else {
          control.markAllAsTouched();
        }
      });
    }
    this.presupuesto.m2 =  this.m2FormGroup.value.m2; 
    console.log(this.presupuesto);
  }
  clickTipoInmueble(){

    if (this.tipoInmuebleFormGroup.invalid) {
      return Object.values(this.tipoInmuebleFormGroup.controls).forEach(control => {
        if ( control instanceof FormGroup ) {
          Object.values(control.controls).forEach( data => {
            data.markAllAsTouched();
          });
        } else {
          control.markAllAsTouched();
        }
      });
    }
    this.presupuesto.tipoInmueble =  Number(this.tipoInmuebleFormGroup.value.tipoInmueble);
    console.log(this.presupuesto);
  }
  clickTipoPlan(){
    if (this.tipoPlanFormGroup.invalid) {
      return Object.values(this.tipoPlanFormGroup.controls).forEach(control => {
        if ( control instanceof FormGroup ) {
          Object.values(control.controls).forEach( data => {
            data.markAllAsTouched();
          });
        } else {
          control.markAllAsTouched();
        }
      });
    }
    this.presupuesto.tipoPlan =  Number(this.tipoPlanFormGroup.value.tipoPlan);
    console.log(this.presupuesto);
  }
  clickContacto(){

    if (this.contactoFormGroup.invalid) {
      return Object.values(this.contactoFormGroup.controls).forEach(control => {
        if ( control instanceof FormGroup ) {
          Object.values(control.controls).forEach( data => {
            data.markAllAsTouched();
          });
        } else {
          control.markAllAsTouched();
        }
      });
    }
    this.presupuesto.contacto = {...this.contactoFormGroup.value };
  }

  clickEnviar(){
    console.log(this.presupuesto);
  }

}
