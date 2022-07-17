import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TraceabilityService } from 'projects/lib-shared-components/src/lib/services/traceability/traceability.service';
import { AppConfig } from 'src/app/app-config';
import { ModalComponent } from 'src/app/common/modal/modal.component';
import { TraceDataParametroSearch } from '../../models/traceability/parametro-ForSearch/I_traceDataParametroForSearch';
import { CustomPaginator } from '../../utils/customPaginator';
import { labelPages } from '../../utils/pagination.utils';


@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class ParametersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @Input() menuselect: string;
  public logDataLoaded = false;
  public traceData: TraceDataParametroSearch[] = [];
  dataSource = new MatTableDataSource([]);
  public displayedColumns: string[] = [
    'nombre',
    'tipo',
    'valorNumerico',
    'valorTexto',
    'activo',
    'idAliado',
    'edit'
  ];
  objResponse: any;
  mensajeRespuesta: String;
  dataCrearParametro: any;
  dataEditarParametro: any;
  showPaginator: boolean = false;
  notFound: string = '';
  page: any;
  paginatorList: HTMLCollectionOf<Element>;

  constructor(
    private traceabilityService: TraceabilityService,
    private dialog: MatDialog,) {}

  ngOnInit() {}

  getinfoParametrosOutput(dataParametro: any){
    if(dataParametro.nombreParametro){
      this.logDataLoaded = true;
      let nombreParametro = dataParametro.nombreParametro;
      let tipoParametro = dataParametro.tipoParametro;
      let idAliado = dataParametro.idAliadoSelect;
      this.traceabilityService.
      parameterForSearch(AppConfig.settings.apiServer.backend, nombreParametro, tipoParametro, idAliado)
      .subscribe((result)=>{
        if(result.codRespuesta === 1 ){
          this.showPaginator = true;
          this.objResponse = result;
          this.dataSource = new MatTableDataSource(this.objResponse.respuestaServicio)
          this.logDataLoaded = false;
          this.notFound = this.objResponse.respuestaServicio.length === 0 ? 'No se encontraron datos para el Parametro seleccionado' : '';
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.paginator.pageSize = 10;
            this.dataSource.paginator.length = this.dataSource.data.length;
            this.paginatorList = document.getElementsByClassName('mat-paginator-range-label');
            this.onPaginateChange(this.paginator, this.paginatorList);
            this.paginator.page.subscribe(() => {
              this.onPaginateChange(this.paginator, this.paginatorList);
            });
          });

        }
        else {
          this.logDataLoaded = false;
          this.notFound =  'Se presenta error en la consulta';
        }
      })
    }
  }

  onPaginateChange(paginator: MatPaginator, list: HTMLCollectionOf<Element>) {
    setTimeout(
      (idx) => {
        if (list.length >= 1) list[0].innerHTML = labelPages(paginator);
      },
      0,
      paginator.pageIndex
    );
  }

  crearParametro(data){
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        tipoModal: 'CrearParametro',
      },
      disableClose: true,
      width: '400px',
      height: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.dataCrearParametro = result;
        this.parametroCreateOrEdit(result);
      }
    });
  }

  editarParametro(dataEdit: any){
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        tipoModal:        'EditarParametro',
        idParametro:      dataEdit.id,
        nombreParametro:  dataEdit.nombre,
        tipoParametro:    dataEdit.tipo,
        valorNumerico:    dataEdit.valorNumerico,
        valorTexto:       dataEdit.valorTexto,
        activo:           dataEdit.activo,
        idAliado:         dataEdit.idAliado
      },
      disableClose: true,
      width: '400px',
      height: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.parametroCreateOrEdit(result);
      }
    });
  }

  parametroCreateOrEdit(dataEditar: any){
    let idParametro = dataEditar[1].parametroId;
    let nombreParametro = dataEditar[0].nombreParametro.replace(/\s+/g, '');
    let tipoParametro = dataEditar[0].tipoParametro.replace(/\s+/g, '');
    let valorNumerico = dataEditar[0].valorNumerico;
    let valorTexto = dataEditar[0].valorTexto;
    let activo = dataEditar[0].activo;
    let idAliado = dataEditar[0].idAliado;
    this.traceabilityService.parameterCreateOrEdit
    (AppConfig.settings.apiServer.backend, idParametro, nombreParametro,  tipoParametro, valorNumerico, valorTexto, activo, idAliado)
    .subscribe((result)=>{
      if(result.codRespuesta === 0 ){
        this.modalConfirmacionRespuesta("Se procento un fallo al guardar el registro");
      }
      if(result.codRespuesta === 1 ){
        this.modalConfirmacionRespuesta("Informacion procesada con exito");
      }
      if(result.codRespuesta === 2 ){
        this.modalConfirmacionRespuesta("Ya existe un registro con ese nombre");
      }
    })
  }

  modalConfirmacionRespuesta(resuestaServicio: string){
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        tipoModal:        'confirmacionRegistro',
        mensajeRespuesta: resuestaServicio
      },
      disableClose: true,
      width: '400px',
      height: '200px'
    });
  }
}
