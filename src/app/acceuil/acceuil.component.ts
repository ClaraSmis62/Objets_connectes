import { Component, OnInit } from '@angular/core';

import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { ampouleConnectee } from '../models';

import {Router} from '@angular/router';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  title = 'Ampoule_connectee';

  public utcTime = new Date().toUTCString();
  private oneHour = 60 * 60 * 1000;
  public accurateTime = new Date(new Date(this.utcTime).getTime() + this.oneHour);
  public time = this.accurateTime.toUTCString();

  public modeInfo = 1;
  public dataMeteo: any;
  private historyRef: AngularFireList<ampouleConnectee>;
  public history?: ampouleConnectee[];
  public current?: ampouleConnectee | null;
  public Mode?: ampouleConnectee["Mode"] | null;
  public cloudCover = 20;
  public visibility = 20;




  constructor(
    private router: Router,
    db: AngularFireDatabase

  ) {
    this.historyRef = db.list<ampouleConnectee>('/history');

  }

  callApi() {
    //situation géographique de Calais
    const lat = 50.95;
    const lng = 1.85;
    const start = new Date().toISOString();
    const end = new Date().toISOString();
    const params = 'cloudCover,visibility';

    fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${start}&end=${end}`, {
      headers: {
        //the key of API
        //21b62788-a6c4-11ed-a654-0242ac130002-21b62828-a6c4-11ed-a654-0242ac130002
        'Authorization': 'ac4694fc-a71c-11ed-b59d-0242ac130002-ac46956a-a71c-11ed-b59d-0242ac130002'
      }
    }).then((response) => response.json()).then((jsonData) => {
      console.log(jsonData);
      console.log("temps", jsonData.hours[0].time);

      //dwd : Deutscher Wetterdienst, which is the German Meteorological Service
      console.log("Taux de nuage", jsonData.hours[0].cloudCover.dwd);

      // noaa :National Oceanic and Atmospheric Administration
      console.log("Visuanility", jsonData.hours[0].visibility.noaa);

      this.cloudCover = jsonData.hours[0].cloudCover.dwd ;
      this.visibility = jsonData.hours[0].visibility.noaa;
    });

  }


  ngOnInit(): void {
    
    this.historyRef
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.history = data;
        this.current = data[data.length - 1];
      })


  }
  
  changement_mode() {
    if (this.modeInfo != 0)
      this.Mode = this.modeInfo;
    console.log(this.Mode);
  }

  marqueurConfig = {
    "0": { couleur: '#555', taille: 8, label: '0', type: 'ligne' },
    "1": { couleur: '#555', taille: 8, label: '1', type: 'ligne' },
    "2": { color: '#555', size: 8, label: '2', type: 'line' },
    "3": { color: '#555', size: 8, label: '3', type: ' ligne' },
  }


}
