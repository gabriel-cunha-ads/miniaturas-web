import { Fabricante } from './fabricante';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap, take, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FabricantesService {

  private readonly API = `${environment.API}fabricantes`;

  constructor(private http: HttpClient ) { }

  list() : Observable<Fabricante[]>{
    
    return this.http.get<Fabricante[]>(`${this.API}`)
              .pipe(
                delay(3000),
                tap(f => console.log(f))
              );
  }

  findById(id) {
    return this.http.get<Fabricante>(`${this.API}/${id}`).pipe(take(1));
  }

  save (fabricante) {
    if (fabricante.id) {
      return this.update(fabricante);
    }
    return this.create(fabricante);
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));;
  } 

  private create(fabricante) {
    return this.http.post(this.API, fabricante)
          .pipe(
            take(1)
          );
  }

  private update(fabricante) {
    return this.http.put(`${this.API}/${fabricante.id}`, fabricante).pipe(take(1));;
  }  

}
