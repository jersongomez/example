import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TraceabilityService } from 'projects/lib-shared-components/src/lib/services/traceability/traceability.service';
import { AppConfig } from 'src/app/app-config';
import { ModalComponent } from 'src/app/common/modal/modal.component';
import { TraceDataAliadoSearch } from '../../models/traceability/aliado-Search/I_traceDataAliadoForSearch';
import { CustomPaginator } from '../../utils/customPaginator';
import { labelPages } from '../../utils/pagination.utils';

@Component({
  selector: 'app-add-allies',
  templateUrl: './add-allies.component.html',
  styleUrls: ['./add-allies.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class AddAlliesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @Input() menuselect: string;
  public logDataLoaded = false;
  public displayedColumns: string[] = [
    'nombreAliado',
    'fecha',
    'parametros',
    'riesgo',
    'aliadoAddi',
    'activo',
    'edit'
  ];
  public traceData: TraceDataAliadoSearch[] = [];
  dataSource = new MatTableDataSource([]);
  mensajeRespuesta: string = '';
  objResponse: any;
  dataeditarAliado: any;
  datacrearAliado: any;
  notFound: string = '';
  isEmpy: boolean = false;
  page: any;
  paginatorList: HTMLCollectionOf<Element>;
  showPaginator: boolean = false;



  constructor(
    private dialog: MatDialog,
    private traceabilityService: TraceabilityService
    ) {
    }

  ngOnInit() {
  }

  getDataSearch(informacionAliados: any){
    if(informacionAliados.aliadosNombre){
      this.logDataLoaded = true;
      let textoBusqueda = informacionAliados.aliadosNombre;
      let aliadoAddi = informacionAliados.aliadoAddi;
      let estadoAliado = informacionAliados.estadoAliado;
      this.traceabilityService.findAlliets(AppConfig.settings.apiServer.backend,  textoBusqueda, aliadoAddi, estadoAliado ).subscribe(
        (respuestaServicio) =>{
          if (respuestaServicio.codRespuesta === 1){
            this.showPaginator = true;
            this.objResponse = respuestaServicio;
            this.dataSource = new MatTableDataSource(this.objResponse.respuestaServicio)
            this.logDataLoaded = false;
            this.notFound = this.objResponse.respuestaServicio.length === 0 ? 'No se encontraron datos para el ID seleccionado' : '';
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
          } else {
            this.logDataLoaded = false;
            this.notFound = 'Se presenta error en la consulta'
          }
        }
      )
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


  createAlliet(crearAliado){
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
         tipoModal: 'crearAliado',
         crearAliado: crearAliado,
         },
      disableClose: true,
      width: '400px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.datacrearAliado = result;
        this.servicioEditarCrearAliado(this.datacrearAliado)
      }
    });
  }

  editarAliado(element: any){
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        tipoModal:     'EditarAliado',
        idAliado:       element.id,
        nombreAliado:   element.nombreAliado,
        riesgo:         element.riesgo,
        AliadoAddi:     element.aliadoAddi,
        EstadoAliado:   element.activo
         },
      disableClose: true,
      width: '400px',
      height: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataeditarAliado = result;
        this.servicioEditarCrearAliado(this.dataeditarAliado)
      }
    });
  }

  servicioEditarCrearAliado(cambiosEditar: any){
    let id: number = cambiosEditar[1].aliadoId;
    let nombreAliado: string = cambiosEditar[0].nombreAliado;
    let aliadoAddi: boolean = cambiosEditar[0].AliadoAddi;
    let riesgo: number = cambiosEditar[0].riesgo;
    let activo: boolean = cambiosEditar[0].EstadoAliado;
    this.traceabilityService.publicaliadoCreateOrEdit(AppConfig.settings.apiServer.backend, id, nombreAliado, activo, riesgo, aliadoAddi).subscribe(
      (respuestaServicio) =>{
        if(respuestaServicio.codRespuesta === 0 ){
          this.modalConfirmacionRespuesta("Se procento un fallo al guardar el registro");
        }
        if(respuestaServicio.codRespuesta === 1 ){
          this.modalConfirmacionRespuesta("Informacion procesada con exito");
        }
        if(respuestaServicio.codRespuesta === 2 ){
          this.modalConfirmacionRespuesta("Ya existe un registro con ese nombre");
        }
      }
    )
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

