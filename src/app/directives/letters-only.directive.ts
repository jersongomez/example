import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'input[lettersOnly]',
})
export class LettersOnlyDirective {
  constructor(private elf: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const initialValue = this.elf.nativeElement.value;
    this.elf.nativeElement.value = initialValue.replace(/[^a-zA-Z\sñá-úÁ-Ú]*/g, '');
  }
}
