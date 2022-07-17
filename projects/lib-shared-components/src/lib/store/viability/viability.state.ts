export interface ViabilityOrigin {
  name: string;
  applicationNumber: string;
  userName: string;
  email: string;
  partnerCode: string;
}

export interface ViabilityClient {
  idType: string;
  idNumber: string;
  name: string;
  surname: string;
  email: string;
}

export interface ViabilityOtherInfo {
  dateOfBirth: string;
  cityBirth: string;
  dateAdmission: string;
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
  cellphone: string;
  address: string;
  laborCity: number;
}

export interface ViabilityCreditInfo {
  creditNumber: number;
  requestAmount: number;
  amountInstallments: number;
  purchaseValue: number;
  insurancePolicy: boolean;
  gracePeriod: boolean;
  totalSafe: number;
  tasaEA: number;
  dealerAccount: number;
  dealerAgreement: number;
  allRisk: number;
  valueCuota: number;
}

export interface ViabilityMiddlewareFlowData {
  origin: ViabilityOrigin;
  client: ViabilityClient;
  otherInfo: ViabilityOtherInfo;
  creditInfo: ViabilityCreditInfo;
}

export interface ViabilityState {
  flowMiddlewareData: ViabilityMiddlewareFlowData;
}

export const initialViabilityState: ViabilityState = {
  flowMiddlewareData: {
    origin: null,
    client: null,
    otherInfo: null,
    creditInfo: {
      creditNumber: 0,
      requestAmount: null,
      valueCuota: 0,
      amountInstallments: null,
      purchaseValue: null,
      insurancePolicy: true,
      gracePeriod: true,
      totalSafe: null,
      tasaEA: null,
      dealerAccount: null,
      dealerAgreement: null,
      allRisk: null,
    },
  },
};
