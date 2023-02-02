import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase, 
  AngularFireList, 
} from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { ampouleConnectee } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ampoule_connectee';
  private historyRef: AngularFireList<ampouleConnectee>;
  public history?: ampouleConnectee[];
  public current?: ampouleConnectee | null;
  constructor(db: AngularFireDatabase)
  {
    this.historyRef = db.list<ampouleConnectee>('/history');
  }
  ngOnInit(): void{
    this.historyRef
    .snapshotChanges()
    .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val()} ))))
    .subscribe((data) => {
      this.history = data;
      this.current = data[data.length-1];
    })
  }

  marqueurConfig = {
    "0" : { couleur : '#555' , taille : 8, label : '0' , type : 'ligne' },
     "1" : { couleur : '#555' , taille : 8, label: '1', type : 'ligne' },
     "2" : { color: '#555' , size: 8, label: '2' , type : 'line' },
     "3" : { color: '#555' , size: 8, label: '3', type : ' ligne' },
}
}
