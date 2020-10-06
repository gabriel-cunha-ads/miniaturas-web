import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { catchError } from 'rxjs/operators';
import { Fabricante } from './../fabricante';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FabricantesService } from '../fabricantes.service';
import { Observable, Subject, empty } from 'rxjs';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-fabricantes-lista',
  templateUrl: './fabricantes-lista.component.html',
  styleUrls: ['./fabricantes-lista.component.scss']
})
export class FabricantesListaComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal;
  fabricantes$: Observable<Fabricante[]>;
  error$ = new Subject<boolean>();
  cursoSelecionado: Fabricante;
  deleteModalRef: BsModalRef;
  

  constructor(private service: FabricantesService, 
              private alertService: AlertModalService, 
              private router: Router, 
              private route: ActivatedRoute, 
              private modalService: BsModalService) { }

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

  onEdit(id) {
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(fabricante) {
    this.cursoSelecionado = fabricante;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmeDelete() {
    this.service.remove(this.cursoSelecionado.id).subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover o fabricante. Tente novamente mais tarde!');
        this.deleteModalRef.hide();
      }
    );
  }

  onRefresh() {
    this.listar();
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar os fabricantes. Tente novamente mais tarde!');
  }

}
