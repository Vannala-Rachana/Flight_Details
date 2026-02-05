import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface FlightInfoPayload {
  airline: string;
  arrivalDate: string;
  arrivalTime: string;
  flightNumber: string;
  numOfGuests: number;
  comments?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private http = inject(HttpClient);

  submitFlightInfo(payload: FlightInfoPayload): Observable<any> {
    const headers = new HttpHeaders({
      'token': environment.flightApi.token,
      'candidate': environment.flightApi.candidate
    });

    return this.http.post(environment.flightApi.url, payload, { headers });
  }
}
