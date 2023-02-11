import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { NgxGaugeModule } from 'ngx-gauge';
import { PageHistoriqueComponent } from './page-historique/page-historique.component';
import { RouterModule } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ConsomationComponent } from './consomation/consomation.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHistoriqueComponent,
    AcceuilComponent,
    ConsomationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxGaugeModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  providers: [{provide: FIREBASE_OPTIONS, useValue: environment.firebase},AppComponent,PageHistoriqueComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
