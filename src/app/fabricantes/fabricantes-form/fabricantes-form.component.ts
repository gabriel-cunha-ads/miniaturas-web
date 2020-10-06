import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { FabricantesService } from './../fabricantes.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-fabricantes-form',
  templateUrl: './fabricantes-form.component.html',
  styleUrls: ['./fabricantes-form.component.scss']
})
export class FabricantesFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, 
              private service: FabricantesService, 
              private modal: AlertModalService,
              private location: Location,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {

//     Antes de utilizar o resolver
//     this.route.params
//     .pipe(
//       map(
//         (params: any) => params['id']),
//         switchMap(id => this.service.findById(id)
//       )

// //      switchMap(fabricantes => getOutrosFilhosDeFabricantes) 
// //      concatMap -> ordem da requisicao importa
// //      mergeMap  -> ordem nao importa
// //      exhaustMap -> casos de login
//     )
//     .subscribe(fabricante => this.updateForm(fabricante));    
    
// Com Guarda de rota "Resolver"
    const fabricanteResolver = this.route.snapshot.data['fabricanteResolver'];


    this.form = this.fb.group({
      id: [fabricanteResolver.id],
      nome: [fabricanteResolver.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  updateForm(fabricante) {
    this.form.patchValue({
      id: fabricante.id,
      nome: fabricante.nome
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);

    if (this.form.valid) {
      
      console.log('submit');

      let msgSuccess = 'Fabricante criado com sucesso!';
      let msgError = 'Erro ao criar fabricante. Tente novamente!';

      if (this.form.value.id) {
        msgSuccess = 'Fabricante atualizado com sucesso!';
        msgError = 'Erro ao atualizar fabricante. Tente novamente!';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },

        error => this.modal.showAlertDanger(msgError),

        () => console.log('request completo')
      );

      // if (this.form.value.id) {
      //   this.service.update(this.form.value).subscribe(
      //     success => {
      //       this.modal.showAlertSuccess('Fabricante atualizado com sucesso!');
      //       this.location.back();
      //     },
  
      //     error => this.modal.showAlertDanger('Erro ao atualizar fabricante. Tente novamente!'),
  
      //     () => console.log('request completo')
      //   );
      // } else {
      //   this.service.create(this.form.value).subscribe(
      //     success => {
      //       this.modal.showAlertSuccess('Fabricante Criado com sucesso!');
      //       this.location.back();
      //     },
  
      //     error => this.modal.showAlertDanger('Erro ao criar fabricante. Tente novamente!'),
  
      //     () => console.log('request completo')
      //   );
        
      // }

    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();

  }
}
