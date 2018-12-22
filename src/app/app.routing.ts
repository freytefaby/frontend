import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//componentes

import {LoginComponent}  from './componente/login/login.component';
import { VentasComponent } from './componente/ventas/ventas.component';
import { CategoriaComponent } from './componente/categoria/categoria.component';
import { CreateVentaComponent } from './componente/ventas/create-venta/create-venta.component';
const appRoutes: Routes=[
{path:'',component:LoginComponent},
{path:'ventas',component:VentasComponent},
{path:'ventas/create',component:CreateVentaComponent},
{path:'categorias',component:CategoriaComponent},
{path:'**',component:LoginComponent}



];

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
