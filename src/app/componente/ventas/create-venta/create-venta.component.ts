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

//datos de los productos que vienen en la base de datos
nombre_producto:string;
nombre_laboratorio:string;
stock:number;
precioventa:number;
idproducto:number;
cantidadempaque:number;
impuesto:number;
comision:number;
preciocompra:number;


//datos para insertar array detalle
precio:number;
total_cantidad:number;
iva:number;
ganancia_vendedor:number;
utilidades:number;
valorcompra:number;
detalles: Array<any>=[];

//datos totales de la venta
totalV:number=0;
impuestoV:number=0;
netoV:number=0;

//inputs model
tipo:number=0;
cantidad:number=0;
unidad:number=0;

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
      this.tipo=data['idtipoproducto'];
      this.idproducto=data['idproducto'];
      this.cantidadempaque=data['cantidadempaque'];
      this.impuesto=data['valoriva'];
      this.comision=data['comision'];
      this.preciocompra=data['preciocompra'];
      


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

  if(detalle.value['cantidad']>0)
  {
    this.total_cantidad=detalle.value['unidad']*this.cantidadempaque+detalle.value['cantidad'];
  }
  else
    {
      this.total_cantidad=detalle.value['unidad']*this.cantidadempaque;
    }
  
  if(this.comprobar_repetido(this.idproducto))
  {

    swal({
      title: 'Error',
      text: 'Este producto ya se encuentra en el detalle',
      type: 'error'
    });
  }
  else if(this.total_cantidad<1)
  {
    swal({
      title: 'Error',
      text: 'Los productos deben tener cantidades',
      type: 'error'
    });
  }
  else if(this.stock < this.total_cantidad)
  {
    swal({
      title: 'Error',
      text: 'Este producto no posee stock para venta',
      type: 'error'
    });

  }
  else
    {
      this.valorcompra=this.total_cantidad*this.preciocompra/this.cantidadempaque;
      this.precio=this.total_cantidad*this.precioventa/this.cantidadempaque;
      this.iva=this.precio*this.impuesto/100;
      this.ganancia_vendedor=this.comision*this.total_cantidad/this.cantidadempaque;
      this.utilidades=this.precio-this.valorcompra;
       this.totalV=this.totalV+this.precio;
       this.impuestoV=this.impuestoV+this.iva;
       this.netoV=this.netoV+this.precio+this.iva;
      this.detalles.push({'producto':this.nombre_producto,
      'id':this.idproducto,
      'venta':this.precio+this.iva,
      'cantidad':this.total_cantidad,
      'subtotal':this.precio});
      // console.log("cantidad: "+this.total_cantidad);
      // console.log("Valor: "+this.precio);
      // console.log("Valor de impuesto: "+this.iva);
      // console.log("Comision por vendedor: "+this.ganancia_vendedor);
      // console.log("Utilidad por este producto: "+this.utilidades);

    }
 
                     


}

delete_product(index:number,subtotal:number,impuesto:number,neto:number)
{
 this.detalles.splice(index,1);
 this.totalV=this.totalV-subtotal;
 this.impuestoV=this.impuestoV-impuesto;
 this.netoV=this.netoV-neto;
 
}

comprobar_repetido(datos:number)
{
  var sw=false;
  for (var _i = 0; _i < this.detalles.length; _i++) {

      if(this.detalles[_i]['id']===datos)
      {
        sw=true;

      }
      
    
    }
    return sw;


}

realizar_venta(venta:NgForm)
{

alert(venta.value['venta']);
this._venta.crear(this.detalles).subscribe(
  data=>
  {
    console.log(data);

  },
  error=>
  {

    console.log(error);
  })

}
}
