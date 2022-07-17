import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CalculatorService } from '../../../services/shared/calculator.service';
import { RadiogroupComponent } from '../radiogroup/radiogroup.component';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  public mobile = false;
  public size: number;
  @ViewChild(RadiogroupComponent, { static: false }) radioGroup: RadiogroupComponent;
  constructor(public calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.size = window.innerWidth;
    this.mobile = this.size < 767.97 ? true : false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.size = event.target.innerWidth;
    this.mobile = this.size < 767.97 ? true : false;
  }

  public unClick() {
    this.radioGroup.unClick();
  }
}
