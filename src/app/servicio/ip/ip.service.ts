import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpService {
  public ip:string
  constructor(private http : HttpClient) { }

  public servidor()
  {

      return this.ip='http://192.168.1.15/backend/public/api';

  }

    public headers_post: HttpHeaders = new HttpHeaders({
      Authorization: 'Access',
      'Content-Type': 'application/json'
    });

    public headers_get: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
    });
  
}
