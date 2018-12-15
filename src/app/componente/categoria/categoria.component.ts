import { CategoriaService } from './../../servicio/categoria/categoria.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpService } from 'src/app/servicio/ip/ip.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  
  categorias:any;
p: number;
totalpages: number;
page: any;
itemsPagina: any;
buscar: any;
nombre:string;
descripcion:string;
idcategoria:number;
  constructor(public _category: CategoriaService,public _ip: IpService, public router: Router, private _http : HttpClient) { }

  ngOnInit() {
    this.getCategory(this.page);
  }

  public getCategory(p2)
{
    this._http.get(this._ip.servidor()+ '/categorias?page=' + p2)
    .subscribe(
      data => {
      this.categorias=data['data'];
      this.totalpages = data['total'];
      this.itemsPagina = data['per_page'];
      this.p = data['current_page'];
        console.log(data);
      },
          error => {
            console.log(error);
            }
    );
}
getPage(p) {
  this._http.get(this._ip.servidor() + '/categorias?page=' + this.p + '&buscar=' + '')
    .subscribe(data => {
      this.getCategory(p);
      // console.log(p);
    });
}
show(numero:number)
{
    this._http.get(this._ip.servidor()+ '/category_id/'+numero)
        .subscribe(
          data => {
            console.log(data);
            this.nombre=data['descripcioncategoria'];
            this.descripcion=data['descrip'];
            this.idcategoria=data['idcategoria']
        
          return data['descripcioncategoria'];
          },
              error => {
                console.log(error);
                }
        );
      
     
  }
  onSubmit(forma:NgForm,id:number){
    
    this._category.updateCategory(forma.value['nombre'], forma.value['descripcion'],id);
    setTimeout(() => {
        this.getCategory(this.page);
    }, 1000);
   
  }



}


