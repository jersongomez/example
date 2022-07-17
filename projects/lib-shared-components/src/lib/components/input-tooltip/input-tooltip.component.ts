import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CalculatorService } from 'src/app/services/shared/calculator.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as models from 'src/app/models/index';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'lib-input-tooltip',
  templateUrl: './input-tooltip.component.html',
  styleUrls: ['./input-tooltip.component.scss'],
})
export class InputTooltipComponent implements OnInit, OnDestroy {
  @Input('label') public label: string;
  @Input('readonly') public readonly: boolean = true;
  @Input('value') public value: string;
  @Input('tooltipText') public tooltipText: string;

  constructor(public calculatorService: CalculatorService) {}

  ngOnInit() {}

  ngOnDestroy() {}
}
