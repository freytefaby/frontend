import { LoginService } from './../../servicio/login/login.service';
import { Observable } from 'rxjs/internal/observable';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
public sw:boolean;

constructor(public _login: LoginService) {
this.sw=true;
}

onSubmit(forma:NgForm){
  
  this._login.login(forma.value['username'], forma.value['password']);
  
 
}
 


  ngOnInit() {
   
  

  }

}
