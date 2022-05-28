import { Component, OnDestroy, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  private _subscriptions: Subscription[] = [];

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    const getMomentsObservable = this.momentService
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
      });

    this._subscriptions.push(getMomentsObservable);
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
