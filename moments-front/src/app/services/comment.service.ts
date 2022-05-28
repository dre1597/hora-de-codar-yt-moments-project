import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../Comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private _baseApiUrl = environment.baseApiUrl;
  private _commentsUrl = `${this._baseApiUrl}/comments`;

  constructor(private http: HttpClient) {}

  createComment(data: Comment): Observable<Comment> {
    return this.http.post<Comment>(this._commentsUrl, data);
  }
}
