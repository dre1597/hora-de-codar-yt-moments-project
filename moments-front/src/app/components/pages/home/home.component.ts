import { Component, OnDestroy, OnInit } from '@angular/core';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Moment } from '../../../Moment';
import { MomentService } from '../../../services/moment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl: string = environment.baseApiUrl;

  faSearch: IconDefinition = faSearch;
  searchTerm: string = '';

  private _subscriptions: Subscription[] = [];

  constructor(
    private momentService: MomentService,
    private ngxLoader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.ngxLoader.start();
    const getMomentsSubscription = this.momentService
      .getMoments()
      .subscribe((moments) => {
        const data = moments;

        const momentsWithMappedData = data.map((moment) => {
          moment.createdAt = new Date(moment.createdAt!).toLocaleDateString(
            'pt-BR'
          );
          return moment;
        });

        this.allMoments = momentsWithMappedData;
        this.moments = momentsWithMappedData;
        this.ngxLoader.stop();
      });

    this._subscriptions.push(getMomentsSubscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) =>
      moment.title.toLowerCase().includes(value)
    );
  }
}
