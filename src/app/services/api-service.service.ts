// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class ApiService {
 private apiUrl = 'https://randomuser.me/api/?results=5';

 constructor(private http: HttpClient) { }

 getChartData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
 }
}
