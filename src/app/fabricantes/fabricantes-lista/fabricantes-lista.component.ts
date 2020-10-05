import { AlertModalService } from './../../shared/alert-modal.service';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { catchError } from 'rxjs/operators';
import { Fabricante } from './../fabricante';
import { Component, OnInit } from '@angular/core';
import { FabricantesService } from '../fabricantes.service';
import { Observable, Subject, empty } from 'rxjs';

@Component({
  selector: 'app-fabricantes-lista',
  templateUrl: './fabricantes-lista.component.html',
  styleUrls: ['./fabricantes-lista.component.scss']
})
export class FabricantesListaComponent implements OnInit {

  fabricantes$: Observable<Fabricante[]>;
  error$ = new Subject<boolean>();
  bsModalRef: BsModalRef;

  constructor(private service: FabricantesService, private alertService: AlertModalService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.fabricantes$ = this.service.list()
                                              .pipe(
                                                catchError(erro => {
                                                  console.error(erro);
                                                  this.handleError();
                                                  return empty();
                                                })
                                              );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar os fabricantes. Tente novamente mais tarde!');
  }

}
