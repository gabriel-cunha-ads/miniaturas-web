import { FabricantesModule } from './fabricantes/fabricantes.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'fabricantes'},
  {path: 'fabricantes', loadChildren: './fabricantes/fabricantes.module#FabricantesModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
