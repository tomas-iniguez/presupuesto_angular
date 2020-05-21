import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn} from '@angular/forms';


import { PresupuestoModule } from '../../moduls/presupuesto.module';
import { PresupuestoService } from '../../services/presupuesto.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  mt2FormGroup: FormGroup;
  tipoInmuebleFormGroup: FormGroup;
  tipoPlanFormGroup: FormGroup;
  contactoFormGroup: FormGroup;

  tipoPlanes: any[]    = [];
  tipoInmuebles: any[] = [];

  presupuesto: PresupuestoModule = new PresupuestoModule() ;

  get mt2NoValido() {
    return this.mt2FormGroup.get('mt2').invalid && this.mt2FormGroup.get('mt2').touched;
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
  
  constructor(private _formBuilder: FormBuilder, private _presupuestoService: PresupuestoService) { }


  ngOnInit(): void {
    this.mt2FormGroup = this._formBuilder.group({
      mt2: ['', [ Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]  ]
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
      termino: [false, Validators.required ]
    });

    this._presupuestoService.getCompotentes().subscribe( (resp: any) => {
       if (resp.estado) {
           this.tipoPlanes     = resp.tipoPlan;
           this.tipoInmuebles  = resp.tipoInmueble;
       }
    });
  }
  clickMt(){
    if (this.mt2FormGroup.invalid) {
      return Object.values(this.mt2FormGroup.controls).forEach(control => {
        if ( control instanceof FormGroup ) {
          Object.values(control.controls).forEach( data => {
            data.markAllAsTouched();
          });
        } else {
          control.markAllAsTouched();
        }
      });
    }
    this.presupuesto.mt2 =  this.mt2FormGroup.value.mt2; 
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
    Swal.fire({
      title: 'Espere',
      text: 'mandando su información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this._presupuestoService.enviarPresupuesto(this.presupuesto).subscribe( (resp: any) => {
        if ( resp.estado ) {
          Swal.fire({
            title: 'Exito',
            text: resp.resultado,
            icon: 'success',
            showConfirmButton: true,
          }).then( mand => {
            if (mand.value) {
              window.location.reload();
            }
           });
        }
    });
  }

}
