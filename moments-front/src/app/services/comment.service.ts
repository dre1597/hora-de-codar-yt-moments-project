import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Comment } from '../Comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private _baseApiUrl: string = environment.baseApiUrl;
  private _commentsUrl: string = `${this._baseApiUrl}/comments`;

  constructor(private http: HttpClient) {}

  createComment(data: Comment): Observable<Comment> {
    return this.http.post<Comment>(this._commentsUrl, data);
  }
}
