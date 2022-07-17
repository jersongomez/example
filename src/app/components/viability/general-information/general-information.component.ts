import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralInformationService } from 'src/app/services/viability/general-information.service';
import { ViabilityService } from 'src/app/services/viability/viability.service';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss'],
})
export class GeneralInformationComponent implements OnInit, OnDestroy {
  public touched$: Subscription;

  constructor(public generalInfoService: GeneralInformationService, public viabilityService: ViabilityService) {}

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
