import { AlertModalService } from './../../shared/alert-modal.service';
import { FabricantesService } from './../fabricantes.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fabricantes-form',
  templateUrl: './fabricantes-form.component.html',
  styleUrls: ['./fabricantes-form.component.scss']
})
export class FabricantesFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private service: FabricantesService, private modal: AlertModalService,
    private location: Location ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
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

      this.service.create(this.form.value).subscribe(

        success => {
          this.modal.showAlertSuccess('Fabricante Criado com sucesso!');
          this.location.back();
        },

        error => this.modal.showAlertDanger('Erro ao criar fabricante. Tente novamente!'),

        () => console.log('request completo')
      );
    }
  }


  onCancel() {
    this.submitted = false;
    this.form.reset();

  }
}
