import { element } from 'protractor';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TraceDataDocuments } from 'projects/lib-shared-components/src/lib/models/traceability/trace.dataDocuments';
import { TraceabilityService } from 'projects/lib-shared-components/src/lib/services/traceability/traceability.service';
import { AppConfig } from 'src/app/app-config';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-signed-documents',
  templateUrl: './signed-documents.component.html',
  styleUrls: ['./signed-documents.component.scss']
})
export class SignedDocumentsComponent implements OnInit {
  @Input() menuselect: string;
  objResponse: any;
  notFound: string = '';
  public logDataLoaded = false;
  public displayedColumns: string[] = [
    'TipoDocumento',
    'NumeroCedula',
    'Aliado',
    'NumeroCasoBizagi',
    'Documento'
  ];

  public traceData: TraceDataDocuments[] = [];
  dataSource = new MatTableDataSource([]);

  constructor(
    private traceabilityService: TraceabilityService
    ) {
  }

  ngOnInit() {
  }

  getsignedDocuments(e) {
    this.logDataLoaded = true;
    this.traceabilityService.getsignedDocuments(AppConfig.settings.apiServer.middleware, e.cedulaId).subscribe(
      (RespServices) => {
        this.logDataLoaded = true;
        if (RespServices.codRespuesta === 1){
          this.objResponse = RespServices;
          this.dataSource = new MatTableDataSource(this.objResponse.respuestaServicio);
          this.logDataLoaded = false;
          this.notFound = this.objResponse.respuestaServicio.length === 0 ? 'No se encontraron datos para el ID seleccionado' : '';
        }
        if(RespServices.codRespuesta === 2){
          this.logDataLoaded = false;
          this.notFound = 'Se presenta error en la consulta'
        }
    }, error => {
      console.error("error services")
    })
  }

  public isEmpty(element): boolean {
    return element.length === 0;
  }

  downloafFile(element){
  if (element.mimeContent === 'pdf'){
    this.dowdloadPDF(element)
  } if (element.mimeContent === 'jpg'|| element.mimeContent === 'png'){
    this. dowdloadJPG(element)
  }
}

  dowdloadPDF(element) {
    var byteCharacters = atob(element.binaryFile);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'application/octet-stream'});
    FileSaver.saveAs(blob, `${ element.fileName }`);
  }

  dowdloadJPG(element) {
    var byteCharacters = atob(element.binaryFile);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'image/gif'});
    FileSaver.saveAs(blob, `${ element.fileName }`);
  }
}

