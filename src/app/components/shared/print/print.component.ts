import { Component, Input } from '@angular/core';
import { CalculatorService } from 'src/app/services/shared/calculator.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss'],
})
export class PrintComponent {
  @Input() public logo: string;
  @Input() public logoClass: string;
  constructor(public calculatorService: CalculatorService) {}
}
