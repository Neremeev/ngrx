import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppState} from './redux/app.state';
import {AddCar, DeleteCar, LoadCars, UpdateCar} from './redux/cars.action';
import {Car} from './car.model';
import {Observable} from 'rxjs/index';

@Injectable()
export class CarsService {

  static BASE_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient, private store: Store<AppState>) {}


  preloadCars(): Observable<any> {
    return this.http.get(CarsService.BASE_URL + 'cars');
  }


  loadCars(): void {
    this.http.get(CarsService.BASE_URL + 'cars')
      .subscribe((cars: Car[]) => {
        this.store.dispatch(new LoadCars(cars));
      });
  }

  addCar(car: Car) {
    this.http.post(CarsService.BASE_URL + 'cars', car)
      .subscribe((car: Car) => {
        this.store.dispatch(new AddCar(car));
      });
  }


  deleteCar(car: Car) {
    this.http.delete(CarsService.BASE_URL + 'cars/' + car.id)
      .subscribe(_ => {
        this.store.dispatch(new DeleteCar(car));
      });
  }

  updateCar(car: Car) {
    this.http.put(CarsService.BASE_URL + 'cars/' + car.id, car)
      .subscribe((car: Car) => {
        this.store.dispatch(new UpdateCar(car));
      });
  }


}
