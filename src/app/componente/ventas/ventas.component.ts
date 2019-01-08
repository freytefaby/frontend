import { Component, OnInit } from '@angular/core';
import { IpService } from 'src/app/servicio/ip/ip.service';
import { CategoriaService } from './../../servicio/categoria/categoria.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {NgForm} from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  venta:any;
  page: any;
  p: number;
  itemsPagina: any;
  totalpages: number;
  criterio:string='nombrecliente';
  search:string='';
  constructor(public _category: CategoriaService,public _ip: IpService, public router: Router, private _http : HttpClient, private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    this.getVentas(this.page);
   
  }

  public getVentas(p2)
{
    this.spinner.show();
    this._http.get(this._ip.servidor()+'/ventas?page=' + p2+'&nombre='+this.search+'&criterio='+this.criterio,{headers:this._ip.headers_get})
    .subscribe(
      data => {
        
        this.spinner.hide();
          this.venta=data['data'];
          this.totalpages = data['total'];
          this.itemsPagina = data['per_page'];
          this.p = data['current_page'];
           console.log(data);
      },
          error => {
            console.log(error);
            this.spinner.hide();
            if(error['error']['error']===1)
                {
                  swal({
                    title: 'Error!!',
                    text: 'No tienes permiso para acceder a este recurso!!',
                    type: 'warning'
                  });
                  this.router.navigate(['/error']);
                }
           
            }
    );
}

getPage(p) 
{
  this._http.get(this._ip.servidor() + '/ventas?page=' + this.p+'&nombre='+this.search+'&criterio='+this.criterio,{headers:this._ip.headers_get})
    .subscribe(data => {
      this.getVentas(p);
      // console.log(p);
    });
}

busqueda(busqueda:NgForm)
 {
   this.search=busqueda.value['search'];
   this.criterio=busqueda.value['criterio'];
   this.getVentas(this.page);
 }




}
