import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabricantesRoutingModule } from './fabricantes-routing.module';
import { FabricantesListaComponent } from './fabricantes-lista/fabricantes-lista.component';
import { FabricantesFormComponent } from './fabricantes-form/fabricantes-form.component';


@NgModule({
  declarations: [FabricantesListaComponent, FabricantesFormComponent],
  imports: [
    CommonModule,
    FabricantesRoutingModule, 
    ReactiveFormsModule
  ], 
  exports: [
    
  ]
})
export class FabricantesModule { }
