import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgrxFormsModule } from 'ngrx-forms';
import * as fromApp from './state/reducer';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomErrorStateMatcherDirective } from './custom-error-state-matcher.directive';

@NgModule({
  declarations: [AppComponent, CustomErrorStateMatcherDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgrxFormsModule,
    StoreModule.forRoot({ app: fromApp.reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
