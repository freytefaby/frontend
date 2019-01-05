import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpService } from './../ip/ip.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { compileNgModule } from '@angular/core/src/render3/jit/module';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token:string;
  val:number=0;
  data:string='';
  
  constructor(public _ip: IpService, private _http : HttpClient,  public router: Router, private spinner: NgxSpinnerService) { 
      
  }

  public login(username:string, password:string){
   
  this._http.post(
    `${this._ip.servidor()}/login`,
    {username, password}, { headers: this._ip.headers_post }
  )
    .subscribe(
      
      data => {
        
        if(this.val>0)
        {
          swal({
            title: 'Error',
            text:'Refresca la página con F5, ha ocurrido un error con el inicio de sesión',
            type: 'error'
          });
        }
        else
        {
          console.log(data);
          this.token = data['access_token'];
          localStorage.setItem('token', this.token);
          this.spinner.show();
          setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
        this.router.navigate(['/ventas']);

             }, 5000);
          
        }
       
        this.val=this.val+1;
        console.log(this.val);
      },
          error => {
            console.log(error);
            if(error.error.length>0)
            {
              for (var _i = 0; _i < error.error.length; _i++) {
                  this.data+=error.error[_i]+'<br>';
                  }
                }
                else
                {
                  this.data=error.error.message+'<br>'+error.statusText;
                }
        swal({
        title: 'Error',
        html: this.data,
        type: 'error'
      });
      this.data='';
      
      }
    );



  }
}
