import { FabricantesService } from './../fabricantes.service';
import { Fabricante } from './../fabricante';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FabricanteoResolverGuard implements Resolve<Fabricante> {

  constructor(private service: FabricantesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Fabricante> {

    if (route.params && route.params['id']) {
      return this.service.findById(route.params['id']);
    }

    return of({
      id: null,
      nome: null
    });
  }



}
