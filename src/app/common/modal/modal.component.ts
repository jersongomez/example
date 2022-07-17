import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UtilsService } from 'src/app/services/shared/utils.service';



@Component({
  selector: 'app-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  public  form: FormGroup;
  btnAccept: string;
  initTime: boolean = false;
  timerSeconds = 60;
  tipoModal: string;
  aliadoInactivo: string;
  styleBoton: any;
  colorBotn: string;
  tituloModal: string = '';
  mensajeInformativo: string;


  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private router: Router,
    public utils: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initializerForm();
    this.tipoModal = this.data.tipoModal;
    this.mensajeInformativo = this.data.mensajeRespuesta;
  }

  ngOnInit() {
    this.validateStyles();
  }


  validateStyles(){
    this.valdiateButton();
    this.validarColorBoton(this.data.aliado);
    this.styleBoton = {
      'background-color': this.colorBotn
    }
  }

  validarColorBoton(aliado: string){
    if (aliado == 'paraiso'){
      this.colorBotn = '#EC0000';
    }
    if (aliado == 'Automundial'){
      this.colorBotn = '#269c64';
    }
    if (aliado == 'MueblesyAccesorios'){
      this.colorBotn = '#EC0000';
    }
    if (aliado == 'specialized'){
      this.colorBotn = '#EC0000';
    }
  }

  valdiateButton(){
    this.btnAccept = this.data.type === 'warning' ? 'Cerrar sesion' : 'Aceptar';
    this.initTime = this.data.initTime;
    if (this.data.type === 'warning') {
      this.showTimer();
    }
  }

  showTimer() {
    const count = interval(1000);
    count.subscribe((res) => {
      if (this.timerSeconds === 0) {
        clearInterval(res);
      } else {
        this.timerSeconds = this.timerSeconds - 1;
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  logout() {
    this.dialogRef.close();
    this.router.navigateByUrl('/');
  }

  private initializerForm(){
    if (this.data.tipoModal=='crearAliado' || this.data.tipoModal == 'EditarAliado' ){
      this.form = new FormGroup({
        nombreAliado: new FormControl(this.data.nombreAliado ? this.data.nombreAliado : null,  [Validators.required]),
        riesgo: new FormControl(this.data.riesgo ? this.data.riesgo : null,  [Validators.required]),
        AliadoAddi: new FormControl(this.data.AliadoAddi ? this.data.AliadoAddi : false,  ),
        EstadoAliado: new FormControl(this.data.EstadoAliado ? this.data.EstadoAliado : false,  ),
      });
    } if (this.data.tipoModal=='CrearParametro' || this.data.tipoModal == 'EditarParametro' ){
      this.form = new FormGroup({
        nombreParametro: new FormControl(this.data.nombreParametro ? this.data.nombreParametro : null, [Validators.required]),
        tipoParametro: new FormControl(this.data.tipoParametro ? this.data.tipoParametro : null, [Validators.required]),
        valorNumerico: new FormControl(this.data.valorNumerico ? this.data.valorNumerico : null, []),
        valorTexto: new FormControl(this.data.valorTexto ? this.data.valorTexto : null, []),
        activo: new FormControl(this.data.activo ? this.data.activo : false, [Validators.required]),
        idAliado: new FormControl(this.data.idAliado ? this.data.idAliado : null, [Validators.required]),
      });
    }
  }

  save(event: Event) {
    let row : any[] = [];
    row.push( this.form.value);
    let idParametro = this.tipoModal === 'EditarParametro' ? this.data.idParametro : 0;
    let idAliado = this.tipoModal ===  'EditarAliado' ? this.data.idAliado : 0;
    if(this.tipoModal === 'EditarAliado' || this.tipoModal === 'crearAliado'){
      row.push({aliadoId: idAliado})
    }
    if(this.tipoModal === 'EditarParametro' || this.tipoModal === 'CrearParametro'){
      row.push({parametroId:  idParametro})
    }
    this.dialogRef.close(row);
  }

  public isValidFilter(): boolean {
    return this.form.valid;
  }

}
