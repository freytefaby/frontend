import { CategoriaService } from './servicio/categoria/categoria.service';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

//rutas

import{routing, appRoutingProviders} from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componente/login/login.component';


//servicios
import { LoginService } from './servicio/login/login.service';
import { IpService } from './servicio/ip/ip.service';


import { VentasComponent } from './componente/ventas/ventas.component';
import { CabeceraComponent } from './componente/cabecera/cabecera.component';
import { MenuComponent } from './componente/menu/menu.component';
import { CategoriaComponent } from './componente/categoria/categoria.component';
import { CreateVentaComponent } from './componente/ventas/create-venta/create-venta.component';
import { ShowComponent } from './componente/ventas/show/show.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VentasComponent,
    CabeceraComponent,
    MenuComponent,
    CategoriaComponent,
    CreateVentaComponent,
    ShowComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule
   
  ],
  providers: [appRoutingProviders, LoginService, IpService, CategoriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
