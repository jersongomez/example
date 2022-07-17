export interface Parameter {
  id: number;
  name: string;
  type: string;
  numbericalValue: number;
  textValue: string;
  active: boolean;
  valueFeeWithInsurance?: number;
  valueFeeShow?: boolean;
}

export interface PartnerState {
  id: number;
  partnerName: string;
  active: boolean;
  date: string;
  parameters: Parameter[];
}
