import { FabricanteoResolverGuard } from './guards/fabricanteo-resolver.guard';
import { FabricantesFormComponent } from './fabricantes-form/fabricantes-form.component';
import { FabricantesListaComponent } from './fabricantes-lista/fabricantes-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '', component: FabricantesListaComponent 
  },
  {
    path: 'novo', component: FabricantesFormComponent,
    resolve: {
      fabricanteResolver: FabricanteoResolverGuard
    }
  },
  { 
    path: 'editar/:id', component: FabricantesFormComponent,
    resolve: {
      fabricanteResolver: FabricanteoResolverGuard
    }     
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricantesRoutingModule { }
