import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IpService } from '../ip/ip.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(public _ip: IpService, private _http : HttpClient,  public router: Router) { }

  buscarclientecc(cedula:number)
 {
  
  return this._http.get(this._ip.servidor()+'/consultarcc/'+cedula,{headers:this._ip.headers_get});

 }

 tipoventa()
 {
  
  return this._http.get(this._ip.servidor()+'/tipoventa',{headers:this._ip.headers_get});

 }

 buscarproducto(codigobarra:number)
 {
  
  return this._http.get(this._ip.servidor()+'/product_cod/'+codigobarra,{headers:this._ip.headers_get});

 }

 crear(data:Array<any>)
 {
  
  return this._http.post(this._ip.servidor()+'/crearventa',{data},{headers:this._ip.headers_get});

 }
}

