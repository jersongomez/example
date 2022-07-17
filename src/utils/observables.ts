import { Observable } from "rxjs";
import { filter, first } from "rxjs/operators";

function hasValue(value: any) {
  return value !== null && value !== undefined;
}

export function getObsevableValue<T>(observable: Observable<T>): Promise<T> {
  return observable
    .pipe(
      filter(hasValue),
      first()
    )
    .toPromise();
}