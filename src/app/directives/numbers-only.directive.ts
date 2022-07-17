import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'input[numbersOnly]',
})
export class NumbersOnlyDirective {
  constructor(private elf: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const initialValue = this.elf.nativeElement.value;
    this.elf.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
  }
}
