import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Moment } from '../Moment';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private _baseApiUrl = environment.baseApiUrl;
  private _momentsUrl = `${this._baseApiUrl}/moments`;

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

  removeMoment(id: number) {
    const url = `${this._momentsUrl}/${id}`;
    return this.http.delete(url);
  }
}
