import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';

import {AppComponent} from './app.component';
import {CarsFormComponent} from './cars-form/cars-form.component';
import {CarComponent} from './car/car.component';
import {carsReducer} from './redux/cars.reducer';
import {HttpClientModule} from '@angular/common/http';
import {CarsService} from './cars.service';
import {EffectsModule} from '@ngrx/effects';
import {CarsEffect} from './redux/cars.effect';
import {RouterModule} from '@angular/router';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    CarsFormComponent,
    CarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([CarsEffect]),
    StoreModule.forRoot({carPage: carsReducer}),
    RouterModule.forRoot([
      {path: '', component: AppComponent}
    ]),
    StoreRouterConnectingModule,
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [CarsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
