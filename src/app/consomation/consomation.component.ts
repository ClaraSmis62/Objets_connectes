import { Component, OnInit } from '@angular/core';

import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { first, map } from 'rxjs';
import { ampouleConnectee, item_Consomation } from '../models';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-consomation',
  templateUrl: './consomation.component.html',
  styleUrls: ['./consomation.component.css'],

})
export class ConsomationComponent implements OnInit {

  title = 'Ampoule_connectee';
  private historyRef: AngularFireList<ampouleConnectee>;
  public history?: ampouleConnectee[];
  public current?: ampouleConnectee | null;
  public cosomTotal = 0;
  public cosomEveryTime = 0;
  public item: Array<item_Consomation> = [
    { DateDebut: new Date(), DateFin: new Date(), Duree: 0, Consommation: 0, Prix: 0 }
  ];

  constructor(
    db: AngularFireDatabase,
  ) {
    this.historyRef = db.list<ampouleConnectee>('/variables');
  }

  ngOnInit(): void {
    var i = 0;
    this.historyRef
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.history = data;
        this.current = data[data.length - 1];
        console.log(this.history);

        for (i = 0; i < this.history.length - 1; i++) {
          if (!this.history[i].Date || !this.history[i + 1].Date) {
            console.log("One of the dates is undefined.");
            continue;
          }
          const date = this.history[i].Date;
          const convertedFirstDate = date ? new Date(date) : undefined;
          let firstDate;
          if (convertedFirstDate) {
            firstDate = Date.parse(convertedFirstDate.toISOString());
          } else {
            firstDate = undefined;
          }
          const newDate = this.history[i + 1].Date;
          const convertedSecondDate = newDate ? new Date(newDate) : undefined;
          let secondDate;
          if (convertedSecondDate) {
            secondDate = Date.parse(convertedSecondDate.toISOString());
          } else {
            secondDate = undefined;
          }
          let differenceInHours;
          if (firstDate && secondDate) {
            differenceInHours = (secondDate - firstDate) / (1000 * 60 * 60);
          } else {
            differenceInHours = undefined;
          }
          console.log("fisrt", date);
          console.log("second", newDate);
          console.log(`The time difference is ${differenceInHours} hours.`);
          //Un led a 20 mcd et 625 nm longueur d'onde dominante. Donc On a 0.020 lm pour un amboule.
          //0.02 lm est de 0.002 watt
          //1000 watts consomme donc 1kWh 1 h 
          //0,1464 €/1kWh
          //wh /1000
          // euro/1000/1000

          const newItem = {
            DateDebut: date,
            DateFin: newDate,
            Duree: differenceInHours ? parseFloat(differenceInHours.toFixed(4)) : undefined,
            Consommation: differenceInHours ? (differenceInHours * 2) ? parseFloat((differenceInHours * 2).toFixed(4)) : undefined : undefined,
            Prix: differenceInHours ? (differenceInHours * 2 * 0.1464) ? parseFloat((differenceInHours * 2 * 0.1464).toFixed(4)) : undefined : undefined
          };
          this.item.push(newItem);
        }

        this.item.splice(0, 1);
        console.log(this.item);
      }
      )
  }
}
