import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpService } from 'src/app/servicio/ip/ip.service';
import { VentaService } from 'src/app/servicio/venta/venta.service';

@Component({
  selector: 'app-create-venta',
  templateUrl: './create-venta.component.html',
  styleUrls: ['./create-venta.component.css']
})
export class CreateVentaComponent implements OnInit {
nombre_cliente:string='';
id_cliente:number=0;
tipoventarray:any;

//datos de los productos
nombre_producto:string;
nombre_laboratorio:string;
stock:number;
precioventa:number;
  constructor(public _venta:VentaService) { }

  ngOnInit() {
    this.tipoventa();
  }

  buscarcliente(search:NgForm)
  {
    this._venta.buscarclientecc(search.value['cedula']).subscribe(
      data=>{

          console.log(data)
          this.nombre_cliente=data['nombrecliente']+' '+data['apellidocliente'];
          this.id_cliente=data['idcliente'];
         

      },
      error=>
      {
          console.log(error)
          this.nombre_cliente='No se encuentra'
      }

    );
  }

  
tipoventa()
{
  this._venta.tipoventa().subscribe(
    data=>
    {
      
      this.tipoventarray=data;
      console.log(this.tipoventarray);
    },
    error=>
    {
      console.log(error)
    });

}

buscararticulocod(codigo:NgForm)
{

  console.log(codigo.value)
  this._venta.buscarproducto(codigo.value['codigo']).subscribe(
    data=>{
      console.log(data)
      this.nombre_producto=data['descripcionproducto'];
      this.nombre_laboratorio=data['nombreproveedor'];
      this.stock=data['stock'];
      this.precioventa=data['preciosugerido'];
    },error=>{console.log(error)}
  )
}
}