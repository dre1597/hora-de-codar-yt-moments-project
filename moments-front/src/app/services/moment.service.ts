import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Moment } from '../Moment';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private _baseApiUrl: string = environment.baseApiUrl;
  private _momentsUrl: string = `${this._baseApiUrl}/moments`;

  constructor(private http: HttpClient) {}

  getMoments(): Observable<Moment[]> {
    return this.http.get<Moment[]>(this._momentsUrl);
  }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this._momentsUrl, formData);
  }

  getMoment(id: number): Observable<Moment> {
    const url = `${this._momentsUrl}/${id}`;
    return this.http.get<Moment>(url);
  }

  updateMoment(id: number, formData: FormData): Observable<FormData> {
    const url = `${this._momentsUrl}/${id}`;
    return this.http.patch<FormData>(url, formData);
  }

  removeMoment(id: number): Observable<void> {
    const url = `${this._momentsUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
