import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatahandlerService } from './datahandler.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _storage: Storage | null = null;

  constructor(private db: AngularFireDatabase,
    public datahandlerService: DatahandlerService,
    private localNotifications: LocalNotifications,
    public storage: Storage) {

    this.init();
    this.db.object('auratgarmData').valueChanges().subscribe(res => {
      // console.log(res);
      this.datahandlerService._quoteDatabaseSubject.next(res);
      this.createPushNotification(res);
    });
    
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  createPushNotification(data) {

    let notificationQuote = data[Math.floor(Math.random() * (data.length))].quoteList[1].replace(/<br>/g, '');
  //  console.log(notificationQuote);
    this.localNotifications.schedule({
      text: notificationQuote,
      foreground: true,
      title: 'आज की टिप',
      trigger: {
        count: 1,
        every: {
          hour: 21,
          minute: 10
        }
      },

    })
  }
}
