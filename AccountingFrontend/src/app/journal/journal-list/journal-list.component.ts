import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JournalMasterView } from 'src/app/models/journal-master-view';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-journal-list',
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.css']
})
export class JournalListComponent implements OnInit {

  listModel: JournalMasterView[] = [];

  constructor(
    private journalService: JournalService,private route:Router
  ) {}

  ngOnInit() {
   this.loadData();
  }

   loadData() {
     this.journalService.getAll().subscribe((data:any)=>{
     if(data.status){
       this.listModel=data.result;
     }else{
       this.listModel=[];
     }
    });
 }

  addNew(){
    this.route.navigate(['/account/journal']);
  }

   view(id: number) {
    this.route.navigate(['/account/journal/view/',id]);
  }
   edit(id: number) {
    this.route.navigate(['/account/journal-edit/',id]);
  }
}
