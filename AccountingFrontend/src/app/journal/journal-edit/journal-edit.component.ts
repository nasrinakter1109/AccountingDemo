import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalService } from '../../services/journal.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-journal-edit',
  standalone: true,
  imports: [],
  templateUrl: './journal-edit.component.html',
  styleUrl: './journal-edit.component.css'
})
export class JournalEditComponent implements OnInit {
  id?: number;
  constructor(private router: ActivatedRoute,private journalService:JournalService,private fb: FormBuilder,private route:Router){}
  ngOnInit(): void {
    // Retrieve the 'id' parameter and use the non-null assertion operator
    this.router.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // '!' asserts that id will not be null
      console.log('Customer ID:', this.id);
    });
    this.edit(this.id!);

  }

   edit(id: number) {
    console.log({id})
     this.journalService.getById(id).subscribe((data:any)=>{
      if(data.status){
         console.log(data.result)

      }else{

      }
     });;

  }
}
