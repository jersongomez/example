import { Injectable } from '@angular/core';
import { ViabilityClient } from 'projects/lib-shared-components/src/lib/store/viability/viability.state';
import { ViabilityFacade } from 'projects/lib-shared-components/src/public-api';
import { Observable } from 'rxjs';
import { DocumentDownload, GeneralInfo } from 'src/app/models/general-info.model';
import { Constants } from 'src/app/utils/constants';
import { CalculatorService } from '../shared/calculator.service';
import { getObsevableValue } from 'src/utils/observables';
import { ViabilityService } from './viability.service';
import { creditNoViable } from 'projects/lib-shared-components/src/lib/models/old-app/general-info.model';

@Injectable({
  providedIn: 'root',
})
export class GeneralInformationService {
  private URL_TYC_CONSUMO = 'https://santanderfinancing.com/tycconsumo/';

  private dataInfo: GeneralInfo;

  public viabilityClient$: Observable<ViabilityClient> = this.viabilityFacade.client$;

  private initDataError: GeneralInfo = {
    title: '¡Hubo un error!',
    subtitle: 'Servicio no disponible',
    img: Constants.PATH_BAD_BUSINESSMAN,
  };

  private initNoViable: creditNoViable = {
    title: 'En este momento no podemos procesar tu solicitud',
    img: Constants.PATH_BAD_BUSINESSMAN,
  };

  private initLastRqApproved: GeneralInfo = {
    titletext: '¡RECUERDA!',
    text: 'No olvides realizar el proceso de validación de seguridad a tu cliente "WHO IS WHO"',
    subtitle: 'Sin finalizar este proceso exitosamente no podrás facturar el pedido.',
    title: '¡Tu solicitud fue aprobada!',
    img: Constants.PATH_GOOD_BUSINESSMAN,
    content: {
      title: '¡Felicitaciones!',
      subtitle: 'Tu cliente ya firmó los documentos del crédito.',
    },
  };
  private initSendDocs: GeneralInfo = {
    titletext: '¡RECUERDA!',
    text: 'Ademas de la firma electrónica, No olvides realizar el proceso de validación de seguridad a tu cliente "WHO IS WHO", Sin finalizar este proceso exitosamente no podrás facturar el pedido."',
    img: Constants.PATH_GOOD_BUSINESSMAN,
    subtitle: `
      Te enviamos los documentos de tu crédito a tu correo electrónico para que los valides y los firmes.
      O ingresa <a href="${this.URL_TYC_CONSUMO}" target="_blank">aquí</a>
    `,
  };
  private initFailIdentity: GeneralInfo = {
    title: 'No se pudo validar <br> la identidad del cliente',
    subtitle: '',
    img: Constants.PATH_BAD_BUSINESSMAN,
  };
  private documents: DocumentDownload[] = [];

  constructor(
    public viabilityService: ViabilityService,
    protected calculatorService: CalculatorService,
    public viabilityFacade: ViabilityFacade
  ) {}

  public set DataInfo(data: GeneralInfo) {
    this.dataInfo = data;
  }

  public get DataInfo(): GeneralInfo {
    return this.dataInfo;
  }

  public set Documents(documents: DocumentDownload[]) {
    this.documents = documents;
  }

  public get Documents(): DocumentDownload[] {
    return this.documents;
  }

  public setDataError(data: GeneralInfo = this.initDataError): void {
    data.title = !!data.title ? data.title : this.initDataError.title;
    data.subtitle = !!data.subtitle ? data.subtitle : this.initDataError.subtitle;
    data.img = !!data.img ? data.img : this.initDataError.img;

    this.viabilityService.HasNextBtn = false;
    this.DataInfo = data;
  }

  async getLastRqApprovedWithExtradata(): Promise<GeneralInfo> {
    const data = this.initLastRqApproved;
    const fee = this.calculatorService.Cuota;

    const viabilityClient = await getObsevableValue<ViabilityClient>(this.viabilityClient$);

    data.content.status = [
      {
        title: 'Número de identificación',
        value: `${viabilityClient.idNumber}`,
      },
      { title: 'Nombre', value: `${viabilityClient.name} ${viabilityClient.surname}` },
      { title: 'Monto Aprobado ', value: `$ ${fee.montoAFinanciar}` },
      { title: 'Plazo', value: `${fee.numeroCuota}` },
    ];

    return data;
  }

  public async setLastRqApproved(data: GeneralInfo = null): Promise<void> {
    data = data || (await this.getLastRqApprovedWithExtradata());
    this.viabilityService.HasNextBtn = false;
    this.DataInfo = data;
  }

  public setSendDocs(data: GeneralInfo = this.initSendDocs): void {
    this.DataInfo = data;
  }

  public setRqDenied(data: GeneralInfo): void {
    data.title = '¡Tu solicitud fue negada!';
    this.viabilityService.HasNextBtn = false;
    data.img = Constants.PATH_BAD_BUSINESSMAN;
    this.DataInfo = data;
  }

  public setRqApproved(data: GeneralInfo): void {
    data.title = '¡Felicidades tu solicitud es viable!';
    data.subtitle = 'Recuerda que para finalizar el proceso, tu cliente debe firmar documentos.';
    data.img = Constants.PATH_GOOD_BUSINESSMAN;
    this.DataInfo = data;
  }

  public setFailIdentity(data: GeneralInfo = this.initFailIdentity): void {
    this.viabilityService.HasNextBtn = false;
    this.DataInfo = data;
  }
}
