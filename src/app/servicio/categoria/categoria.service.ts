
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpService } from './../ip/ip.service';
import { Observable } from 'rxjs';
import { compileNgModule } from '@angular/core/src/render3/jit/module';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
public nombre:string;
 public sw:string='no tiene datos';
  constructor(public _ip: IpService, private _http : HttpClient,  public router: Router) { }

  ngOnInit() {
    
  }



  
  public updateCategory(nombre:string, descripcion:string,id:number)
      {
              this._http.put(
                `${this._ip.servidor()}/update_category/`+id,
                {nombre, descripcion}, { headers: this._ip.headers_get }
              )
                .subscribe(
                  data => {
                    console.log(data)
                    $('#modalNuevo').modal('hide');
                    this.sw='data bien';
                    // this._category.getCategory('1');
                  
                  },
                      error => {
                        console.log(error);
                        this.sw='data barra';
                        
                        }
                      );
  
           

       } 


}
