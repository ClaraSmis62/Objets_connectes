import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireDatabase, AngularFireList, } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { ampouleConnectee } from '../models';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModel } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-page-historique',
  templateUrl: './page-historique.component.html',
  styleUrls: ['./page-historique.component.css']
})
export class PageHistoriqueComponent implements OnInit {
  title = 'Ampoule_connectee';
  public showInfo = 1;
  public dataMeteo: any;
  private historyRef: AngularFireList<ampouleConnectee>;
  public history?: ampouleConnectee[];
  public current?: ampouleConnectee | null;
  public Mode?: ampouleConnectee["Mode"] | null;

  constructor(
    private route: ActivatedRoute,
    db: AngularFireDatabase
  ) {
    this.historyRef = db.list<ampouleConnectee>('/variables');
  }

  ngOnInit(): void {
    this.historyRef
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.history = data;
        this.current = data[data.length - 1];
      })
    console.log(this.history);
  }

}
