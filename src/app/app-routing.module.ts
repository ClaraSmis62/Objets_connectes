import { NgModule } from '@angular/core';
import { Router,RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AppComponent } from './app.component';
import { ConsomationComponent } from './consomation/consomation.component';
import { PageHistoriqueComponent } from './page-historique/page-historique.component';

const routes: Routes = [
  {path : "", component:AcceuilComponent},
  {path : 'pageHistorique',component:PageHistoriqueComponent},
  {path : 'pageConsomation',component:ConsomationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{
  constructor(public router:Router){}
  
 }
