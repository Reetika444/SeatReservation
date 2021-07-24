import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/Services/data.service';
import { Ticket } from './ticket.model';
import { TrainSeats } from './trainSeata.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  data:any;
  total:any=80;
  dataArr:any;
  seatsArray:any=[][12];
  seatstobebooked:any;
  ticket = new Ticket();
  trainSeats = new TrainSeats();
  bookedTicketArray:any;
  availableSeats:any;
  constructor(
    private dataService:DataService
  ) { }

  ngOnInit() {
    localStorage.setItem("seats", JSON.stringify(this.ticket.trainSeats));
    // this.getticketDetails();
   
  }

  getticketDetails(){
    this.dataService.getData().subscribe(
      res=>{
        this.dataArr = res;
      }
    )

  }

  insertData(){
    console.log(this.ticket);
   

    //  var colors = ["red","blue","green"];
    //  localStorage.setItem("my_colors", JSON.stringify(colors)); //store colors
    //  var storedColors = JSON.parse(localStorage.getItem("my_colors"));
    //  console.log(storedColors);
     this.dataService.insertData(this.ticket).subscribe(res=>{
     
     
      var result = res;
      console.log('inside res');
      console.log(res);
      this.getticketDetails();
      
    }) 
    
  }


  inserticket(){
     //store colors
    var storedSeats = JSON.parse(localStorage.getItem("seats")); 
    console.log(storedSeats);
    console.log(this.ticket);
    if(this.ticket.seatstobebooked > 7){
      alert('At a time maximum 7 seats can be booked');
    }else{
    this.availableSeats = this.total - this.ticket.seatstobebooked;
    console.log(this.availableSeats);
     this.dataService.inserticket(this.ticket).subscribe(res=>{
      console.log('inside res');
      // this.City = res.json() as string[];
      console.log(res);
      var result = JSON.parse(res);
      console.log(result);
      console.log('tickets array is shown')
      console.log(result.tickets);
      this.bookedTicketArray=result.tickets;
     
      this.ticket.trainSeats = result.seatsArray;
      // this.seatsArray = result[1].sea.tickets;
      localStorage.setItem("seats", JSON.stringify(this.ticket.trainSeats));

      // this.getticketDetails(); 
    }) 
  }
}
}
