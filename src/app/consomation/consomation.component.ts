import { Component, OnInit } from '@angular/core';

import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map } from 'rxjs';
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
  public cosomTotal= 0;
  public cosomEveryTime = 0;
  public item: Array<item_Consomation> = [
    { DateDebut: new Date(), DateFin: new Date(), Duree: 0, Consommation: 0,Prix:0}
  ];
  
  constructor(
    db: AngularFireDatabase,
  ) {
    this.historyRef = db.list<ampouleConnectee>('/history');
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
            if ((this.history[i].Luminosite == 0 && this.history[i+1].Luminosite !=0)||(this.history[i].Luminosite != 0 && this.history[i+1].Luminosite !=0)){
              
              const date = this.history[i].Date;
              const firstDate = date ? new Date(date).getTime() : undefined;
              const newDate = this.history[i+1].Date;
              const secondDate = newDate ? new Date(newDate).getTime() : undefined;
            
   
               if (!firstDate || !secondDate) {
                 console.log("One of the dates is undefined.");
                 continue;
               }
               const difference = secondDate- firstDate;
               const differenceInHours = difference / 1000 / 60 / 60;
  
               
               console.log("from",date);
               console.log("to",newDate);
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
                Duree: parseFloat(differenceInHours.toFixed(3)),
                Consommation: parseFloat(differenceInHours.toFixed(3))*2,
                Prix: parseFloat((differenceInHours* 2  * 0.1464).toFixed(3))
            };
            this.item.push(newItem);
         
               this.cosomTotal=this.cosomTotal+differenceInHours;
  
               if(this.history[i].Luminosite&&this.history[i].Luminosite != 0 && this.history[i-1].Luminosite != 0 ){
                this.cosomEveryTime =  this.cosomEveryTime +differenceInHours;
                continue;
               }
               console.log(this.cosomEveryTime);
            } 
          
          
         
           
        }
        console.log(this.cosomTotal.toFixed(2));
        this.item.splice(0, 1);
        console.log(this.item);
      })


  }



 

}
