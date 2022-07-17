import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-initial-percent',
  templateUrl: './initial-percent.component.html',
  styleUrls: ['./initial-percent.component.scss'],
})
export class InitialPercentComponent implements OnInit {
  public form: FormGroup;
  @Input('min') public min: number;
  @Input('max') public max: number;

  @Output() public outPercent = new EventEmitter<number>();

  formCtrlSub: Subscription;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      percent: new FormControl('', [Validators.required, Validators.min(this.min), Validators.max(this.max)]),
    });

    this.formCtrlSub = this.form.valueChanges.subscribe((value) => {
      if (this.form.valid) {
        this.outPercent.emit(+value.percent);
      } else {
        this.outPercent.emit(null);
      }
    });
  }

  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
  }
}
