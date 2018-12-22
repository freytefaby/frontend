import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
cont:number=0;
  constructor() { }

  ngOnInit() {
  }

 almacen()
 {
  this.cont=this.cont+1;
   if(this.cont===1)
    {
     
      $("#almacen").addClass('open');
    }
     else if(this.cont==2)
      {
        
         this.cont=0;
        
         $("#almacen").removeClass('open');

      }
    
      
 }

}
