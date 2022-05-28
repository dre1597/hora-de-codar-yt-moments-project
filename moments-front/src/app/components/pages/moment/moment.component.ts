import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/Comment';
import { Moment } from 'src/app/Moment';
import { CommentService } from 'src/app/services/comment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit, OnDestroy {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  private _subscriptions: Subscription[] = [];

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const getMomentObservable = this.momentService
      .getMoment(id)
      .subscribe((moment) => {
        this.moment = moment;
      });

    this._subscriptions.push(getMomentObservable);

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  removeHandler(id: number) {
    this.momentService.removeMoment(id).subscribe();

    this.messagesService.add('Moment has been deleted successfully');

    this.router.navigate(['/']);
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const comment: Comment = this.commentForm.value;

    comment.momentId = Number(this.moment!.id);

    const createCommentObservable = this.commentService
      .createComment(comment)
      .subscribe((comment) => this.moment!.comments!.push(comment));

    this._subscriptions.push(createCommentObservable);

    this.messagesService.add('Comment added!');

    this._resetForm(formDirective);
  }

  private _resetForm(formDirective: FormGroupDirective) {
    this.commentForm.reset();

    formDirective.resetForm();
  }
}
