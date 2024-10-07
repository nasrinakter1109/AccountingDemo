import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router ,RouterOutlet} from '@angular/router';
import { AccountService } from '../../services/account.service';
import { JournalMasterView } from '../../models/journal-master-view';
import { JournalService } from '../../services/journal.service';
@Component({
  selector: 'app-journal-list',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './journal-list.component.html',
  styleUrl: './journal-list.component.css'
})
export class JournalListComponent implements OnInit {

  listModel: JournalMasterView[] = [];

  constructor(
    private journalService: JournalService,private route:Router
  ) {}

  ngOnInit() {
   this.loadData();
  }

  async loadData() {
    await this.journalService.getAll().subscribe((data:any)=>{
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


  async edit(id: number) {
    this.route.navigate(['/account/journal/view/',id]);
  }
}
