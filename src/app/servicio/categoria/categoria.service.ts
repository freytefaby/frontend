
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpService } from './../ip/ip.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
public nombre:string;

  constructor(public _ip: IpService, private _http : HttpClient,  public router: Router) { }
    
  ngOnInit() {
    
  }


 updateCategory(nombre:string, descripcion:string,id:number)
 {
    return this._http.put(this._ip.servidor()+'/update_category/'+id,{nombre,descripcion},{headers:this._ip.headers_get});


 }
 disableCategory(id:number)
 {
  
  return this._http.put(this._ip.servidor()+'/desactivar/'+id,{id},{headers:this._ip.headers_get});

 }


  }
