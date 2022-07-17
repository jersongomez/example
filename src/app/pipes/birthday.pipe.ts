import { Pipe, PipeTransform } from '@angular/core';
import { Birthday } from 'src/app/models/birthday';

@Pipe({
  name: 'birthday',
})
export class BirthdayPipe implements PipeTransform {
  transform(value: Birthday): string {
    const dia = `0${value.dia}`.substr(-2);
    const mes = `0${value.mes}`.substr(-2);
    return `${dia}/${mes}/${value.year}`;
  }
}
