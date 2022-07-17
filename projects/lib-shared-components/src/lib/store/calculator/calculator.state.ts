import { CalculateFeeRq } from '../../models/calculator/calculate-fee.model';

export interface CreditFee {
  valueFeeWithInsurance: number;
  valueFeeWithoutInsurance: number;
  totalSafeValue: number;
  monthlyInsuranceCost: number;
  totalFinancingAmount: number;
  amountToFinanced: number;
  discountedValue: number;
  rate: number;
  nominalMonthOverdue: number;
  feeNumber: number;
  monthlyFeeWithoutInitial: number;
  initialFee: number;
  valueWithoutInitialFee: number;
  fourPerThousand: number;
  interestCost: number;
  financingDiscount: number;
  gaesCost: number;
  totalGaesCost: number;
  valueWithoutInitialFeeOrDiscount: number;
  creditCard: boolean;
  interestValue: number;
  allRiskValue: number;
  monthlyCostAllRisk: number;
  accidentValue: number;
  annualPremiumValue: number;
  productValue: number;
  riskRate: number;
  capitalValue: number;
  totalValuePaymentWithInsurance: number;
  totalValuePaymentWithoutInsurance: number;
  totalValuePaymentWithoutInsuranceTc?: number;
  error: string;
  zubsidized: boolean;
  valueZubsidized: string;
  valueAssistance: number;
  valueSecureNoAssistance: number;
  ivazubsidized: string;
}

export interface CalculatorState {
  currentFee: CreditFee;
  allFees: CreditFee[];
  loading: boolean;
  calculateFeesRq: CalculateFeeRq;
}

export const initialCalculatorState: CalculatorState = {
  currentFee: {
    valueFeeWithInsurance: 0,
    valueFeeWithoutInsurance: 0,
    totalSafeValue: 0,
    monthlyInsuranceCost: 0,
    totalFinancingAmount: 0,
    amountToFinanced: 0,
    discountedValue: 0,
    rate: 0,
    nominalMonthOverdue: 0,
    feeNumber: 0,
    monthlyFeeWithoutInitial: 0,
    initialFee: 0,
    valueWithoutInitialFee: 0,
    fourPerThousand: 0,
    interestCost: 0,
    financingDiscount: 0,
    gaesCost: 0,
    totalGaesCost: 0,
    valueWithoutInitialFeeOrDiscount: 0,
    creditCard: false,
    interestValue: 0,
    allRiskValue: 0,
    monthlyCostAllRisk: 0,
    accidentValue: 0,
    annualPremiumValue: 0,
    productValue: 0,
    riskRate: 0,
    capitalValue: 0,
    totalValuePaymentWithInsurance: 0,
    totalValuePaymentWithoutInsurance: 0,
    error: null,
    zubsidized: false,
    valueZubsidized: '0',
    valueAssistance: 0,
    valueSecureNoAssistance: 0,
    ivazubsidized: '0',
  },
  allFees: [],
  loading: false,
  calculateFeesRq: null,
};
