import { Fabricante } from './fabricante';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FabricantesService {

  private readonly API = `${environment.API}fabricantes`;

  constructor(private http: HttpClient ) { }

  list () : Observable<Fabricante[]>{
    
    return this.http.get<Fabricante[]>(`${this.API}`)
              .pipe(
                // delay(2),
                tap(f => console.log(f))
              );
  }

  
  create(fabricante) {
    return this.http.post(this.API, fabricante)
          .pipe(
            take(1)
          );
  }

}
