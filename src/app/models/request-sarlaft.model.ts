export interface OriginSarlaft {
  name: string;
  applicationNumber: string;
  userName: string;
  email: string;
  partnerCode: string;
}

export interface ClientSarlaft {
  idType: string;
  idNumber: string;
  name: string;
  surname: string;
  email: string;
}

export interface OtherInfoSarlaft {
  dateOfBirth: string;
  cityBirth: string;
  dateAdmission: string;
  companyName: string;
  typeContract: number;
  companyCity: string;
  companyAddress: string;
  companyPhone: string;
  ocupation: number;
  typeOcupation: number;
  assetValue: string;
  incomeValue: string;
  authorizeInfoEmail: boolean;
  authorizePhone: boolean;
  authorizeEmail: boolean;
  authorizeWhastApp: boolean;
  cityResidence: number;
  departmentResidence: number;
  stratum: number;
  civilStatus: number;
  cellphone: string;
  address: string;
  laborCity: number;
  expeditionDate: string;
}

export interface CreditInfoSarlaft {
  creditNumber: number;
  requestAmount: number;
  amountInstallments: number;
  purchaseValue: number;
  valueCuota: number;
  insurancePolicy: boolean;
  gracePeriod: boolean;
  totalSafe: number;
  tasaEA: number;
  dealerAccount: number;
  dealerAgreement: number;
  allRisk: number;
  lack?: number;
  zubsidized?: boolean;
  valueZubsidized?: string;
  valueAssistance?: number;
  valueSecureNoAssistance?: number;
  ivaZubsidized?: string;
}

export class RequestSarlaft {
  public origin: OriginSarlaft;
  public client: ClientSarlaft;
  public otherInfo: OtherInfoSarlaft;
  public creditInfo: CreditInfoSarlaft;

  constructor() {
    this.origin = {
      name: 'consumo',
      applicationNumber: '0',
      userName: '',
      email: '',
      partnerCode: '',
    };
    this.client = {
      idType: '',
      idNumber: '',
      name: '',
      surname: '',
      email: '',
    };
    this.otherInfo = {
      dateOfBirth: '',
      cityBirth: '',
      dateAdmission: '',
      companyName: '',
      typeContract: null,
      companyCity: '',
      companyAddress: '',
      companyPhone: '',
      ocupation: null,
      typeOcupation: null,
      assetValue: '',
      incomeValue: '',
      authorizeInfoEmail: false,
      authorizePhone: false,
      authorizeEmail: false,
      authorizeWhastApp: false,
      cityResidence: null,
      departmentResidence: null,
      stratum: null,
      civilStatus: null,
      cellphone: '',
      address: '',
      laborCity: null,
      expeditionDate: '',
    };
    this.creditInfo = {
      creditNumber: 0,
      requestAmount: null,
      amountInstallments: null,
      purchaseValue: null,
      valueCuota: 0,
      insurancePolicy: true,
      gracePeriod: true,
      totalSafe: null,
      tasaEA: null,
      dealerAccount: null,
      dealerAgreement: null,
      allRisk: null,
      lack: 0,
      zubsidized: false,
      valueZubsidized: '0',
      valueAssistance: 0,
      valueSecureNoAssistance: 0,
      ivaZubsidized: '0',
    };
  }
}
