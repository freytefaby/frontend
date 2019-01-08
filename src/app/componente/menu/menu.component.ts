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

 ventas()
 {
  this.cont=this.cont+1;
   if(this.cont===1)
    {
     
      $("#ventas").addClass('open');
    }
     else if(this.cont==2)
      {
        
         this.cont=0;
        
         $("#ventas").removeClass('open');

      }
    
      
 }

}
