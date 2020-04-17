import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { State } from './state/model';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('AppComponent', () => {
  const store: Partial<Store<State>> = {
    pipe: jest.fn<any, any>(() => ({ subscribe: jest.fn() })),
  };

  const snackBar: Partial<MatSnackBar> = {
    open: jest.fn(),
    dismiss: jest.fn(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: store },
        { provide: MatSnackBar, useValue: snackBar },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'TeamBuilder'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('TeamBuilder');
  });
});
