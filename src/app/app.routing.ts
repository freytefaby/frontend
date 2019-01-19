import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//componentes

import {LoginComponent}  from './componente/login/login.component';
import { VentasComponent } from './componente/ventas/ventas.component';
import { CategoriaComponent } from './componente/categoria/categoria.component';
import { CreateVentaComponent } from './componente/ventas/create-venta/create-venta.component';
import { ShowComponent } from './componente/ventas/show/show.component';
import { ComprasComponent } from './componente/compras/compras.component';
const appRoutes: Routes=[
{path:'',component:LoginComponent},

//ventas
{path:'ventas',component:VentasComponent},
{path:'ventas/create',component:CreateVentaComponent},
{path:'ventas/show/:id',component:ShowComponent},

//categorias
{path:'categorias',component:CategoriaComponent},

//compras
{path:'compras',component:ComprasComponent},
{path:'**',component:LoginComponent}



];

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
