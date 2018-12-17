import { CategoriaService } from './../../servicio/categoria/categoria.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpService } from 'src/app/servicio/ip/ip.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import swal from 'sweetalert2';
declare var $: any;

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
datos:string='';
criterio:string='descripcioncategoria';
search:string='';
  constructor(public _category: CategoriaService,public _ip: IpService, public router: Router, private _http : HttpClient) { }

  ngOnInit() {
    this.getCategory(this.page);
  }

  public getCategory(p2)
{
    this._http.get(this._ip.servidor()+ '/categorias?page=' + p2+'&nombre='+this.search+'&criterio='+this.criterio)
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
  this._http.get(this._ip.servidor() + '/categorias?page=' + this.p+'&nombre='+this.search+'&criterio='+this.criterio)
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
           //console.log(data);
            this.nombre=data['descripcioncategoria'];
            this.descripcion=data['descrip'];
            this.idcategoria=data['idcategoria'];
          },
              error => {
                console.log(error);
                }
        );
      
     
  }
  onSubmit(forma:NgForm,id:number){
    
   this._category.updateCategory(forma.value['nombre'], forma.value['descripcion'],id).subscribe(
    data => {
      console.log(data);
      if(data==='success')
      {
        this.getCategory(this.page);
        $('#modalNuevo').modal('hide');

      }
                 
      },
        error => {
          console.log(error);
          console.log(error);
            if(error.error.length>0)
            {
              for (var _i = 0; _i < error.error.length; _i++) {
                  this.datos+=error.error[_i]+'<br>';
                  }
                }
                else
                {
                  this.datos=error.error.message+'<br>'+error.statusText;
                }
        swal({
        title: 'Error',
        html: this.datos,
        type: 'error'
      });
      this.datos='';
         }

   );
   
   
  }
  busqueda(search:NgForm)
  {
    this.search=search.value['texto'];
    this.criterio=search.value['criterio'];
    this.getCategory(this.page);

  }

  changedidCategory(id:number)
  {
     this.idcategoria=id;

  }

  desactivar(id:number)
  {
    this._category.disableCategory(id).subscribe(
      data=>{
            console.log(data);
            $('#modalEliminar').modal('hide');
            this.getCategory(this.page);
      },
      error=>
      {
            console.log(error)

      }
    )

  }



}


