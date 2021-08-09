
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController } from '@ionic/angular';
import { AdmobService } from '../services/admob.service';
import { DatahandlerService } from '../services/datahandler.service';
@Component({
  selector: 'app-quote-viewer',
  templateUrl: './quote-viewer.page.html',
  styleUrls: ['./quote-viewer.page.scss'],
})
export class QuoteViewerPage implements OnInit {
  selectedDetailQuote: any;
  favouriteArray: any;
  quotesData: any;
  selectedQuoteId: any;
  selectedQuotesData: any;
  quoteListArray: any[];
  isLoading: boolean;
  constructor(
    public route: ActivatedRoute,
    private socialSharing: SocialSharing,
    private admobService: AdmobService,
    public datahandlerService: DatahandlerService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.admobService.showInterstitial();
    this.isLoading = true;
    // this.checkQuoteInStorage();

    this.datahandlerService._dataConfigSubject.subscribe(value => {
      this.selectedQuoteId = value;
    });

    this.datahandlerService._quoteDatabaseSubject.subscribe(data => {

      this.quotesData = data;
      this.selectedQuotesData = this.quotesData.find(value => value.id === this.selectedQuoteId);

      if (this.selectedQuotesData) {
        this.quoteListArray = this.selectedQuotesData.quoteList;
        this.isLoading = false;
      }

    });


  }



}
