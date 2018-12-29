import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpService } from 'src/app/servicio/ip/ip.service';
import { VentaService } from 'src/app/servicio/venta/venta.service';
import swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
declare var $: any;
@Component({
  selector: 'app-create-venta',
  templateUrl: './create-venta.component.html',
  styleUrls: ['./create-venta.component.css']
})
export class CreateVentaComponent implements OnInit {
nombre_cliente:string='';
id_cliente:number=0;
tipoventarray:any;
contador:number=0;

//datos de los productos que vienen en la base de datos
nombre_producto:string='';
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
comisionesV:number=0;
utilidadesV:number=0;
importe:number=0;
descuento:number=0;

//inputs model
tipo:number=0;
tipov:number=0;
cantidad:number=0;
unidad:number=0;
selectecliente:string='nombrecliente';
selectproducto:string='descripcionproducto';

//DATOS DE BUSQUEDA DE CLIENTE MODAL
datoscliente:any;

//datos de busqueda productos modal
productosModal:any;


  constructor(public _venta:VentaService,public router: Router) { }

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
  else if(this.nombre_producto==='')
    {
      swal({
        title: 'Error',
        text: 'Producto mal calculado',
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
       this.comisionesV=this.comisionesV+this.ganancia_vendedor;
       this.utilidadesV=this.utilidadesV+this.utilidades;
      this.detalles.push({'producto':this.nombre_producto,
      'id':this.idproducto,
      'venta':this.precio+this.iva,
      'cantidad':this.total_cantidad,
      'subtotal':this.precio,
      'utilidad':this.utilidades,
      'comision':this.ganancia_vendedor});
      this.nombre_producto='';
      this.nombre_laboratorio='';
      this.stock=0;
      this.precioventa=0;
      this.tipo=0;
      this.idproducto=0;
      this.cantidadempaque=0;
      this.impuesto=0;
      this.comision=0;
      this.preciocompra=0;

      detalle.reset();
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
  this.importe=venta.value['importe'];
  this.descuento=venta.value['descuento'];
   if(this.detalles.length<=0)
   {
    swal({
      title: 'Error',
      text: 'No hay productos en la venta!!',
      type: 'error'
    });
   }
   else if(this.importe <=0 )
   {
    swal({
      title: 'Error',
      text: 'Error de calculo!!',
      type: 'error'
    });
   }
   else if(this.importe < this.netoV )
   {
    swal({
      title:'Error',
      text: 'El importe debe ser mayor a la venta al menos que estes cubriendo un descuento',
      type: 'error'
    });
    
    
   }
   else if(this.id_cliente===0)
   {
    swal({
      title:'Error',
      text: 'Debes escoger un cliente valido',
      type: 'error'
    });

   }
   else if(this.tipov===0)
   {
    swal({
      title:'Error',
      text: 'Debes escoger el tipo de venta',
      type: 'error'
    });

   }
   else
   {
     this.contador=this.contador+1;
     if(this.contador===1)
     {
      this._venta.crear(this.detalles,this.netoV,this.id_cliente,this.totalV,this.comisionesV,this.utilidadesV,this.importe,this.tipov,this.descuento).subscribe(
        data=>
        {
          console.log(data);
          var res=this.importe-this.netoV;
          var cadena='<h3>Dato registrado exitosamente</h3><h4>No.factura: '+data['factura']+'<br>Cambio: COP'+' '+res+'</h4>';
          swal({
            title: 'Exito!!',
            html: cadena,
            type: 'success'
          });
          this.router.navigate(['/ventas']);
      
        },
        error=>
        {
      
          console.log(error);
          swal({
            title:'Error',
            text: 'No se pudo procesar la solicitud, consulte con el administrador',
            type: 'error'
          });
        })

     }
     else
     { 
       swal({
      title:'Error',
      text: 'Ya hay una solicitud en curso',
      type: 'error'
    });
       
     }
    


   }
   

}

busquedacliente(cliente:NgForm)
{
    console.log(cliente.value);
    this._venta.buscarcliente(cliente.value['selectecliente'],cliente.value['namecliente']).subscribe(
     data=>{
    
      this.datoscliente=data['data'];
      console.log(this.datoscliente);
     

     },error=>{
      console.log(error);

     }

    )
}
buscarclientemodal(id:number)
{
  this._venta.buscarclientecc(id).subscribe(
    data=>{

        console.log(data)
        this.nombre_cliente=data['nombrecliente']+' '+data['apellidocliente'];
        this.id_cliente=data['idcliente'];
        $('#modalClient').modal('hide');

       

    },
    error=>
    {
        console.log(error)
        this.nombre_cliente='No se encuentra'
    }

  );
}
agregar_cliente(cliente:NgForm)
{
 var contC=0;
 var datos='';
contC=contC+1;
if(contC===1)
{this._venta.crear_cliente(cliente.value['nombremc'],cliente.value['apellidomc'],cliente.value['direccionmc'],cliente.value['telefonomc'],cliente.value['cedulamc'],cliente.value['correomc']).subscribe(
  data=>{
    if(data['respuesta']==='ok')
    {
      this._venta.buscarclientecc(data['idcliente']).subscribe(
        data2=>{
  
            console.log(data)
            this.nombre_cliente=data2['nombrecliente']+' '+data2['apellidocliente'];
            this.id_cliente=data['idcliente'];
           
  
        },
        error2=>
        {
            console.log(error2);
            this.nombre_cliente='No se encuentra';
        }
  
      );
      console.log(data);
      cliente.reset();

      $('#crearcliente').modal('hide');

      contC=0;

    }
    
  
  },
  error=>{
    console.log(error);
    if(error.error.length>0)
    {
      for (var _i = 0; _i < error.error.length; _i++) {
          datos+=error.error[_i]+'<br>';
          }
        }
        else
        {
          datos=error.error.message+'<br>'+error.statusText;
        }
swal({
title: 'Error',
html: datos,
type: 'error'
});
    datos='';
    contC=0;
  }
    
  )

}
else
{
  swal({
    title: 'Error',
    text: 'Ya hay una peticion en curso',
    type: 'error'
  });

}


}


buscarproductomodal(datos:NgForm)
{
 console.log(datos.value);
 this._venta.buscarproductomodal(datos.value['selecteproducto'],datos.value['nameproducto']).subscribe(
   data=>{
       
          this.productosModal=data['data'];
          console.log(this.productosModal);
   },
   error=>
   {
      console.log(error);
   }
 )


}

buscarproductocodmod(data:any)
{

 this._venta.buscarproducto(data).subscribe(
   data=>{
        console.log(data);
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
      $('#buscarProductoModal').modal('hide');
   },
   error=>{

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


}

