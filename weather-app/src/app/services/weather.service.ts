import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCities() {
    return this.http.get<string[]>(`${this.apiUrl}/cities`);
  }

  getWeatherData(city: string, day = 1) {
    const params = new HttpParams().set('city', city).set('day', day);
    return this.http.get(`${this.apiUrl}/weather`, { params: params });
  }

  getAirQualityData(city: string) {
    const params = new HttpParams().set('city', city);
    return this.http.get(`${this.apiUrl}/air-quality`, { params: params });
  }

  getHistory() {
    return this.http.get<any>(`${this.apiUrl}/history`);
  }
}
