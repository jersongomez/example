import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralInformationV1Service } from '../../../services/viability-v1/general-information-v1.service';
import { ViabilityV1Service } from '../../../services/viability-v1/viability-v1.service';

@Component({
  selector: 'lib-general-information-v1',
  templateUrl: './general-information-v1.component.html',
  styleUrls: ['./general-information-v1.component.scss'],
})
export class GeneralInformationV1Component implements OnInit, OnDestroy {
  public touched$: Subscription;

  constructor(public generalInfoService: GeneralInformationV1Service, public viabilityService: ViabilityV1Service) {}

  ngOnInit() {
    this.touched$ = this.viabilityService.touched$.subscribe((touched) => {
      if (touched) {
        this.viabilityService.process$.emit(touched);
      }
    });
  }

  ngOnDestroy(): void {
    this.touched$.unsubscribe();
  }

  downloadDocs(): void {
    this.generalInfoService.Documents.forEach((doc) => this.downloadPdf(doc.originalFname, doc.bytes));
  }

  private downloadPdf(name: string, pdfBase64: string): void {
    const linkSource = `data:application/pdf;base64,${pdfBase64}`;
    const downloadLink = document.createElement('a');
    const fileName = name;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}
