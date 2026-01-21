import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export enum DataServiceType {
    MASTER_CATEGORY,
}

@Injectable({
  providedIn: 'root',
})

export class DataService {
  private BASE_URL_API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getServiceTypeUrl(type: DataServiceType): string {
    switch (type) {
      case DataServiceType.MASTER_CATEGORY:
        return `${this.BASE_URL_API}/business-categories`;
      default:
        throw new Error('Invalid DataServiceType');
    }
  }

  // GET data
  list(serviceType: DataServiceType, params?: any): Observable<any> {
    return this.http.get(this.getServiceTypeUrl(serviceType), { params });
  }

  // CREATE data
  create(serviceType: DataServiceType, body: any): Observable<any> {
    return this.http.post(this.getServiceTypeUrl(serviceType), body);
  }

  // UPDATE data
  update(serviceType: DataServiceType, param: string, body: any): Observable<any> {
    return this.http.put(`${this.getServiceTypeUrl(serviceType)}${param}`, body);
  }

  // DELETE data
  delete(serviceType: DataServiceType, param: string): Observable<any> {
    return this.http.delete(`${this.getServiceTypeUrl(serviceType)}${param}`);
  }
}
