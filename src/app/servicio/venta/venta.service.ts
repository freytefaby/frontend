import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IpService } from '../ip/ip.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(public _ip: IpService, private _http : HttpClient,  public router: Router) { }

  buscarclientecc(cedula:number)
 {
  
  return this._http.get(this._ip.servidor()+'/consultarcc/'+cedula,{headers:this._ip.headers_get});

 }

 tipoventa()
 {
  
  return this._http.get(this._ip.servidor()+'/tipoventa',{headers:this._ip.headers_get});

 }

 buscarproducto(codigobarra:number)
 {
  
  return this._http.get(this._ip.servidor()+'/product_cod/'+codigobarra,{headers:this._ip.headers_get});

 }

 buscarcliente(criterio:string,busqueda:string)
 {
  
  return this._http.get(this._ip.servidor()+'/buscarcliente?criterio='+criterio+"&buscar="+busqueda,{headers:this._ip.headers_get});

 }

 crear(data:Array<any>,total:number,cliente:number,subtotal:number,comisiones:number,utilidades:number,importe:number,tipo:number,descuento:number)
 {
  
  return this._http.post(this._ip.servidor()+'/crearventa',{data
    ,total
    ,cliente
    ,subtotal
    ,comisiones
    ,utilidades
    ,importe
    ,tipo
    ,descuento
  },{headers:this._ip.headers_get});

 }

 crear_cliente(nombre:string,apellido:string,direccion:string,telefono:string,cedula:string,correo:string)
 {
  return this._http.post(this._ip.servidor()+'/crearcliente',{nombre,apellido,direccion,telefono,cedula,correo},{headers:this._ip.headers_get});  

 }

 buscarproductomodal(criterio:string,busqueda:string)
 {
  return this._http.get(this._ip.servidor()+'/buscarproducto?criterio='+criterio+"&buscar="+busqueda,{headers:this._ip.headers_get});
 }
 showventa(id:number)
 {
  return this._http.get(this._ip.servidor()+'/ventashow/'+id,{headers:this._ip.headers_get});
 }
}

