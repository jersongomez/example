import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditFee } from 'projects/lib-shared-components/src/lib/store/calculator/calculator.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalculateFeeRq, CalculateFeeRs } from '../../models/calculator/calculate-fee.model';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  URL_CALCULATOR_ALL_FEES = 'puntofisico/calculosCuotas';

  constructor(public http: HttpClient) {}

  private calculateFees(urlApi: string, rq: CalculateFeeRq): Observable<CalculateFeeRs[]> {
    return this.http.post<CalculateFeeRs[]>(`${urlApi}/${this.URL_CALCULATOR_ALL_FEES}`, rq);
  }

  public mappingAllFeesRs(urlApi: string, rq: CalculateFeeRq): Observable<CreditFee[]> {
    return this.calculateFees(urlApi, rq).pipe(
      map((allFeesApiRs) => {
        if (allFeesApiRs.length === 1) {
          throw new Error(allFeesApiRs[0].error);
        }

        return allFeesApiRs.map((feeApiRs) => {
          return {
            valueFeeWithInsurance: feeApiRs.valorCuotaConSeguro,
            valueFeeWithoutInsurance: feeApiRs.valorCuotaSinSeguro,
            totalSafeValue: feeApiRs.valorTotalSeguro,
            monthlyInsuranceCost: feeApiRs.costoMensualSeguro,
            totalFinancingAmount: feeApiRs.montoTotalFinanciamiento,
            amountToFinanced: feeApiRs.montoAFinanciar,
            discountedValue: feeApiRs.valorConDescuento,
            rate: feeApiRs.tasa,
            nominalMonthOverdue: feeApiRs.nominalMesVencido,
            feeNumber: feeApiRs.numeroCuota,
            monthlyFeeWithoutInitial: feeApiRs.cuotaMensualSinInicial,
            initialFee: feeApiRs.cuotaInicial,
            valueWithoutInitialFee: feeApiRs.valorSinCuotaInicial,
            fourPerThousand: feeApiRs.cuatroxMil,
            interestCost: feeApiRs.costoInteres,
            financingDiscount: feeApiRs.descuentoFinanciacion,
            gaesCost: feeApiRs.costoGaes,
            totalGaesCost: feeApiRs.costoTotalGaes,
            valueWithoutInitialFeeOrDiscount: feeApiRs.valorSinCuotaInicialNiDescuento,
            creditCard: feeApiRs.tarjetaDeCredito,
            interestValue: feeApiRs.valorInteres,
            allRiskValue: feeApiRs.valorTodoRiesgo,
            monthlyCostAllRisk: feeApiRs.costoMensualTodoRiesgo,
            accidentValue: feeApiRs.valorAccidentes,
            annualPremiumValue: feeApiRs.valorAccidentes,
            productValue: feeApiRs.valorProducto,
            riskRate: feeApiRs.valorProducto,
            capitalValue: feeApiRs.valorCapital,
            totalValuePaymentWithInsurance: feeApiRs.valorTotalPagoConSeguro,
            totalValuePaymentWithoutInsurance: feeApiRs.valorTotalPagoSinSeguro,
            error: feeApiRs.error,
            zubsidized: feeApiRs.zubsidized,
            ivazubsidized: feeApiRs.ivazubsidized,
            valueZubsidized: feeApiRs.valueZubsidized,
            valueAssistance: feeApiRs.valorAsistencia,
            valueSecureNoAssistance: feeApiRs.valoSeguroSinAsistencia,
          } as CreditFee;
        });
      })
    );
  }
}
