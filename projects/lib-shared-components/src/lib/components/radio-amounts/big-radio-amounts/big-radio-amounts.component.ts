import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CalculatorService } from 'src/app/services/shared/calculator.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as models from 'src/app/models/index';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'lib-big-radio-amounts',
  templateUrl: './big-radio-amounts.component.html',
  styleUrls: ['./big-radio-amounts.component.scss'],
})
export class BigRadioAmountsComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public percentMin: number;
  public auxPercentMin: number;
  public percentMax: number;
  public percentBquilla: number;
  public parameters: models.Parameters[] = [];
  @Input() public labelHeader: string;
  @Input('min') public min$: Observable<number>;
  @Input('max') public max$: Observable<number>;
  public amountsOptions = [
    { label: 'Gama Essence', amount: 2634500, isShow: false },
    { label: 'Gama Smart', amount: 4059000, isShow: false },
    { label: 'Gama Advance', amount: 6825000, isShow: false },
    { label: 'Gama Top', amount: 8032500, isShow: false },
    { label: 'Gama Excellence', amount: 10426500, isShow: false },
  ];

  @Output() public outAmountRequested = new EventEmitter<number>();

  formCtrlSub: Subscription;

  constructor(public calculatorService: CalculatorService, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.listen('window', 'click', () => {
      this.amountsOptions.map((option) => (option.isShow = false));
    });

    this.form = new FormGroup({
      amount: new FormControl('', [Validators.required]),
    });

    combineLatest(this.min$, this.max$)
      .pipe(take(1))
      .subscribe(([min, max]) => {
        this.form = new FormGroup({
          amount: new FormControl('', [Validators.required, Validators.min(min), Validators.max(max)]),
        });
      })
      .unsubscribe();

    this.formCtrlSub = this.form.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      if (this.form.valid) {
        this.outAmountRequested.emit(+value.amount);
      }
    });
  }

  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
  }

  setValue(value: number): void {
    this.form.controls.amount.setValue(value);
  }

  toggleInput(e: Event, amountOption: any) {
    this.amountsOptions.map((option) => (option.isShow = false));
    e.preventDefault();
    e.stopPropagation();
    amountOption.isShow = !amountOption.isShow;
  }

  clickInput(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  changeAmount(e: any, amountOption: any) {
    amountOption.amount = e.target.value;

    setTimeout(() => {
      this.setValue(e.target.value);
    }, 300);
  }
}
