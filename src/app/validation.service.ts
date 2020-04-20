import { Injectable } from '@angular/core';
import { Observable, timer, from } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

export type ValidationResult = { name: string; expletive?: true };

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  checkName(name: string): Observable<ValidationResult> {
    return timer(3000).pipe(mapTo(name), map(this.checkNameImpl));
  }

  private checkNameImpl(name: string): ValidationResult {
    console.log(name);
    return name.toLowerCase().includes('poo')
      ? { expletive: true, name }
      : { name };
  }
}
