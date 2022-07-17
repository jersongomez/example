import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { TraceData } from 'projects/lib-shared-components/src/lib/models/traceability/trace.data';
import { TraceabilityService } from 'projects/lib-shared-components/src/lib/services/traceability/traceability.service';
import { AppConfig } from 'src/app/app-config';
import { TraceFilter } from '../../models/traceability/trace.filter';
import { saveAs } from 'file-saver';
import { CustomPaginator } from '../../utils/customPaginator';
import { labelPages } from '../../utils/pagination.utils';
import { ResponseAdapter } from '../../models/Identity/responseAdapter';
import { ObjectInitializer } from '../../models/Identity/ObjectInitializer';
import { ResponseLogWSService } from '../../models/Identity/responseLogWSService';
import { ResponseLogWS } from '../../models/Identity/responseLogWS';
import { ResponseLogWSServiceBody } from '../../models/Identity/responseLogWSServiceBody';


@Component({
  selector: 'app-identity-date',
  templateUrl: './identity-date.component.html',
  styleUrls: ['./identity-date.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],

})
export class IdentityDateComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @Input() menuselect: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private filterData: TraceFilter;
  vecesConsultado: number = 0;
  private dateFormat: string = 'yyyy/MM/dd';
  objectInitializer: any;



  public displayedColumns: string[] = [
    'identificationNumber',
    'method',
    'status',
    'fecha'
  ];
  public listResponseAdapter: ResponseAdapter[] = [];
  dataSource: MatTableDataSource<any>;
  notFound: string;
  public logDataLoaded = true;
  page: any;
  paginatorList: HTMLCollectionOf<Element>;
  respuesta: any;


  constructor(
    private traceabilityService: TraceabilityService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    objectInitializer: ObjectInitializer
  ) {
    this.objectInitializer = objectInitializer;
  }

  ngOnInit() {
  }

  public getLogByDateRangeAndDocument(filterData: TraceFilter) {
    this.vecesConsultado = 0;
    this.listResponseAdapter = []
    this.filterData = filterData;
    this.logDataLoaded = false;
    this.traceabilityService.getLogWsMethodDocument(
      AppConfig.settings.apiServer.backend,
      this.datePipe.transform(filterData.from, this.dateFormat),
      this.datePipe.transform(filterData.to, this.dateFormat),
      filterData.document)
      .subscribe(resp => {
        this.respuesta = JSON.parse(JSON.stringify(resp.respuestaServicio));
        for (const serviceResp of this.respuesta) {
          let responseAdapter: ResponseAdapter = this.objectInitializer.getAdapterDataLogWs();
          responseAdapter.identificationNumber = serviceResp.identificationNumber;
          responseAdapter.method = serviceResp.method;
          responseAdapter.fecha=serviceResp.dateRequest.substring(10,0);
          let jsonInterno = JSON.parse(serviceResp.response);

          if (serviceResp.method == 'VALIDATION-IDENTIDAD') {
            if (jsonInterno.body.codRespuesta!=undefined) {
              responseAdapter.status = jsonInterno.body.codRespuesta == 3 ? "Correcto" : "Falló";
            }
            else{
              responseAdapter.status = "Falló";
            }
          }
          else if (serviceResp.method == 'VALIDATION-PREGUNTAS' ){
            if (jsonInterno.body.codRespuesta != undefined) {
              responseAdapter.status = jsonInterno.body.codRespuesta == 1 ? "Correcto" : "Falló";
            } else {
              responseAdapter.status = "Falló";
            }
          }
        
          this.listResponseAdapter.push(responseAdapter);
          if (responseAdapter.method == 'VALIDATION-IDENTIDAD') {
            this.vecesConsultado++;
          }
        }
        this.validateLenght();

        if (this.listResponseAdapter !== undefined && this.listResponseAdapter.length > 0) {
          this.dataSource = new MatTableDataSource(this.listResponseAdapter);
          this.logDataLoaded = true;
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
      });





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
  validateLenght() {
    if (this.listResponseAdapter.length === 0) {
      this.notFound = 'No se encontraron datos para el rango seleccionado';
      this.respuesta = null;
      this.logDataLoaded = true;

    }
  }
  public isEmpty(): boolean {
    return this.listResponseAdapter.length === 0;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
