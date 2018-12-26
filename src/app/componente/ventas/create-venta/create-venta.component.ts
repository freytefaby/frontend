import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpService } from 'src/app/servicio/ip/ip.service';
import { VentaService } from 'src/app/servicio/venta/venta.service';
import swal from 'sweetalert2';

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
tipoproducto:number;
total_cantidad:number;
idproducto:number;
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
      this.tipoproducto=data['idtipoproducto'];
      this.idproducto=data['idproducto'];


    },error=>{
      console.log(error);
      if(error.status===400)
      {
        swal({
          title: 'Error',
          text: 'Producto no existe, deseas crear uno nuevo?',
          type: 'error'
        });
        this.nombre_laboratorio='';
        this.stock=0;
        this.precioventa=0;
        this.nombre_producto='';
      }
      else
      {
        swal({
          title: 'Error',
          text: 'Error de servidor, estado ' + error.message,
          type: 'error'
        });
      }
      
    
    }
  )
}

detalle(detalle:NgForm)
{
  this.total_cantidad=detalle.value['unidad']+detalle.value['cantidad'];
  console.log(this.total_cantidad);
}
}
