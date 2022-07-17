import { Component, OnInit } from '@angular/core';
import { CalculatorService } from 'src/app/services/shared/calculator.service';

@Component({
  selector: 'app-resumecalculator',
  templateUrl: './resumecalculator.component.html',
  styleUrls: ['./resumecalculator.component.scss'],
})
export class ResumecalculatorComponent {
  public showContent = false;

  constructor(public calculatorService: CalculatorService) {}
}
