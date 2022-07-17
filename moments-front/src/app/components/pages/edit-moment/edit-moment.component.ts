import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Moment } from '../../../Moment';
import { MessagesService } from '../../../services/messages.service';
import { MomentService } from '../../../services/moment.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css'],
})
export class EditMomentComponent implements OnInit, OnDestroy {
  moment!: Moment;
  btnText: string = 'Edit';

  private _subscriptions: Subscription[] = [];

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const getMomentSubscription = this.momentService
      .getMoment(id)
      .subscribe((moment) => {
        this.moment = moment;
      });

    this._subscriptions.push(getMomentSubscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  editHandler(momentData: Moment): void {
    const id = this.moment.id;

    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if (momentData.image) {
      formData.append('image', momentData.image);
    }

    const updateMomentSubscription = this.momentService
      .updateMoment(id!, formData)
      .subscribe();

    this._subscriptions.push(updateMomentSubscription);

    this.messagesService.add('Moment was added successfully!');

    this.router.navigate(['/']);
  }
}
