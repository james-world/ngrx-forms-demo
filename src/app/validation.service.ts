import { Injectable } from '@angular/core';
import { Observable, timer, from } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

export type ValidationResult = { name: string; expletive?: true };

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  checkName(name: string): Observable<ValidationResult> {
    console.log('Check Name Invoked!');
    return timer(3000).pipe(mapTo(name), map(this.checkNameImpl));
  }

  private checkNameImpl(name: string): ValidationResult {
    return name.toLowerCase().includes('poo')
      ? { expletive: true, name }
      : { name };
  }
}
