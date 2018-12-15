import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  movil() {
    if( $( "#togglebar" ).hasClass( "pace-done" )  ) {
      $("#togglebar").addClass('sidebar-mobile-show');
      $("#togglebar").removeClass('pace-done');
     
     alert("tiene la clasee movil");
 }
 else
 {
  $("#togglebar").removeClass('sidebar-mobile-show');
  $("#togglebar").addClass('pace-done');
  alert(" NO tiene la clasee movil");
    }
  
 
 
    console.log($("#togglebar"));

    }

    escritorio()
    {
      if( $( "#togglebar" ).hasClass( "pace-done" )) {
       $("#togglebar").removeClass('pace-done');
       $("#togglebar").addClass('sidebar-hidden');
       alert("tiene la clasee escritorio");
   }
   else
   {
    $("#togglebar").addClass('pace-done');
    $("#togglebar").removeClass('sidebar-hidden');

    alert(" NO tiene la clasee escritorio");
   }
      console.log($("#togglebar"));
     
    }
  
    


}
