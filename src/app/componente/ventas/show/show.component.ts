import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpService } from 'src/app/servicio/ip/ip.service';
import { VentaService } from 'src/app/servicio/venta/venta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
 nameclient:string='';
 tipoventa:string='';
 id:any;
 detalle:any;
 subtotal:number;
 venta:number;
 descuento:number;
 importe:number;
  constructor(private _route:ActivatedRoute, public _venta:VentaService, private spinner: NgxSpinnerService,private _http : HttpClient,public router: Router) { 
    
  }
 
  ngOnInit() {
    this.getdetalle();
  }

getdetalle()
{
  this.spinner.show();
this.id=this._route.snapshot.paramMap.get('id');
this._venta.showventa(this.id).subscribe(
  data=>{
    this.spinner.hide();
    this.nameclient=data['datos']['nombrecliente']+' '+data['datos']['apellidocliente'];
    this.tipoventa=data['datos']['desctipoventa'];
    this.detalle=data['detalle'];
    this.subtotal=data['datos']['subtotal'];
    this.venta=data['datos']['valorventa'];
    this.descuento=data['datos']['descuento'];
    this.importe=data['datos']['importeventa'];
    
    console.log(data)
        },
  error=>{
     console.log(error)
     this.spinner.hide();
      if(error['error']['error']===1)
      {
           swal({
        title: 'Error',
        text: 'Parametro por URL ha sido ingresado mal',
        type: 'error'
      }); 
      this.router.navigate(['/ventas']);

      }
   
    
         }
)

}
}
