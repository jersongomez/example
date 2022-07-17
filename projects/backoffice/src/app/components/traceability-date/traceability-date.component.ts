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

@Component({
  selector: 'app-traceability-date',
  templateUrl: './traceability-date.component.html',
  styleUrls: ['./traceability-date.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class TraceabilityDateComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @Input() menuselect: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private filterData: TraceFilter;
  private dateFormat: string = 'yyyy/MM/dd';


  public displayedColumns: string[] = [
    'usuario',
    'cedulaCliente',
    'apellidoCliente',
    'decision',
    'causalRechazo',
    'valorAprobado',
    'disponibleEndeudamiento',
    'numeroCaso',
    'firmado',
    'actions',
  ];
  public traceData: TraceData[] = [];
  dataSource: MatTableDataSource<any>;
  notFound: string;
  public logDataLoaded = true;
  page: any;
  paginatorList: HTMLCollectionOf<Element>;


  constructor(
    private traceabilityService: TraceabilityService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  public getLogByDateRange(filterData: TraceFilter) {
    this.filterData = filterData;
    this.logDataLoaded = false;
    this.traceabilityService
      .getLogByDateRange(
        AppConfig.settings.apiServer.backend,
        this.datePipe.transform(filterData.from, this.dateFormat),
        this.datePipe.transform(filterData.to, this.dateFormat)
      )
      .subscribe(
        (logData) => {
          this.traceData = logData;
          this.validateLenght();
          this.dataSource = new MatTableDataSource(this.traceData);
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
        },
        () => {
          this.traceData = [];
          this.validateLenght();
          this.logDataLoaded = true;
        }
      );
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
    if (this.traceData.length === 0) {
      this.notFound = 'No se encontraron datos para el rango seleccionado';
    }
  }
  public isEmpty(): boolean {
    return this.traceData.length === 0;
  }
  public generateLogReportByDateRange() {
    this.traceabilityService
      .generateLogReportByDateRange(
        AppConfig.settings.apiServer.backend,
        this.datePipe.transform(this.filterData.from, this.dateFormat),
        this.datePipe.transform(this.filterData.to, this.dateFormat)
      )
      .subscribe((response) => {
        let blob = new Blob([response], { type: 'application/xls' });
        saveAs(blob, 'ReporteTrazaViabilizacion.xls');
      });
  }
  procesFirmas(row: any) {
    this.traceabilityService.getProcessFirma(AppConfig.settings.apiServer.middleware, row.cedulaCliente, row.numeroCaso, row.nombreAliado).subscribe(
      (response) => {
        if (response.codRespuesta === 1) {
          this.getLogByDateRange(this.filterData);
        } else {
          this.openSnackBar(response.error);
        }
      },
      (error) => {
        this.openSnackBar('Error en la consulta');
      }
    );
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
