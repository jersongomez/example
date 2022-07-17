import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CalculatorService } from 'src/app/services/shared/calculator.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as models from 'src/app/models/index';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'lib-inputheader',
  templateUrl: './inputheader.component.html',
  styleUrls: ['./inputheader.component.scss'],
})
export class InputheaderComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public percentMin: number;
  public auxPercentMin: number;
  public percentMax: number;
  public percentBquilla: number;
  public parameters: models.Parameters[] = [];
  @Input() public labelHeader: string;
  @Input('min') public min$: Observable<number>;
  @Input('max') public max$: Observable<number>;

  @Input('loadValueMin') public loadValueMin: boolean = false;
  @Input('loadValueMax') public loadValueMax: boolean = false;

  @Input('loadCard') public loadCard: boolean = true;

  @Output() public outAmountRequested = new EventEmitter<number>();

  formCtrlSub: Subscription;

  constructor(public calculatorService: CalculatorService) {}

  ngOnInit() {
    this.form = new FormGroup({
      amount: new FormControl('', [Validators.required]),
    });

    combineLatest(this.min$, this.max$)
      .pipe(take(1))
      .subscribe(([min, max]) => {
        this.form = new FormGroup({
          amount: new FormControl('', [Validators.required, Validators.min(min), Validators.max(max)]),
        });

        this.formCtrlSub = this.form.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
          if (this.form.valid) {
            this.outAmountRequested.emit(+value.amount);
          } else {
            this.outAmountRequested.emit(null);
          }
        });

        if (this.loadValueMin) {
          this.setValue(min);
        } else if (this.loadValueMax) {
          this.setValue(max);
        }
      })
      .unsubscribe();
  }

  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
  }

  setValue(value: number): void {
    this.form.controls.amount.setValue(value);
  }
}
