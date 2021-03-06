import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

import { Moment } from '../../../Moment';
import { MessagesService } from '../../../services/messages.service';
import { MomentService } from '../../../services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent implements OnDestroy {
  btnText: string = 'Share';

  private _subscriptions: Subscription[] = [];

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  createHandler(moment: Moment): void {
    this.spinner.show();
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    const createMomentSubscription = this.momentService
      .createMoment(formData)
      .subscribe(() => {
        this.spinner.hide();
      });

    this._subscriptions.push(createMomentSubscription);

    this.messagesService.add('Moment was added successfully!');

    this.router.navigate(['/']);
  }
}
