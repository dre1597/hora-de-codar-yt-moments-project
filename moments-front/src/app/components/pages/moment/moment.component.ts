import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faEdit,
  faTimes,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { environment } from '../../../../environments/environment';
import { Comment } from '../../../Comment';
import { Moment } from '../../../Moment';
import { CommentService } from '../../../services/comment.service';
import { MessagesService } from '../../../services/messages.service';
import { MomentService } from '../../../services/moment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit, OnDestroy {
  moment?: Moment;
  baseApiUrl: string = environment.baseApiUrl;

  faTimes: IconDefinition = faTimes;
  faEdit: IconDefinition = faEdit;

  commentForm!: FormGroup;

  private _subscriptions: Subscription[] = [];

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService,
    private ngxLoader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.ngxLoader.start();
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const getMomentSubscription = this.momentService
      .getMoment(id)
      .subscribe((moment) => {
        this.moment = moment;
        this.ngxLoader.stop();
      });

    this._subscriptions.push(getMomentSubscription);

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  get text(): AbstractControl {
    return this.commentForm.get('text')!;
  }

  get username(): AbstractControl {
    return this.commentForm.get('username')!;
  }

  removeHandler(id: number): void {
    const removeMomentSubscription = this.momentService
      .removeMoment(id)
      .subscribe();

    this._subscriptions.push(removeMomentSubscription);

    this.messagesService.add('Moment has been deleted successfully');

    this.router.navigate(['/']);
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.commentForm.invalid) {
      return;
    }

    const comment: Comment = this.commentForm.value;

    comment.momentId = Number(this.moment!.id);

    const createCommentSubscription = this.commentService
      .createComment(comment)
      .subscribe((comment) => this.moment!.comments!.push(comment));

    this._subscriptions.push(createCommentSubscription);

    this.messagesService.add('Comment added!');

    this._resetForm(formDirective);
  }

  private _resetForm(formDirective: FormGroupDirective): void {
    this.commentForm.reset();

    formDirective.resetForm();
  }
}
