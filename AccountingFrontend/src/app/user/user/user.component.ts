import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoleModel } from '../../models/role';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent  implements OnInit {
  userForm: FormGroup;
  btnStatus:string="Save";
  isSubmitted:boolean=false;
  listRole:RoleModel[] = [ ];

  users: UserModel[] = [];

  constructor(private userService: UserService, private fb: FormBuilder) {

    this.userForm = this.fb.group({
      UserId: [0],
      UserName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      RoleId: [0, Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      Phone: ['', ],
      Active: [true],
    });
  }

  ngOnInit() {
    this.userService.getRoles().subscribe((response: any) => {
      if(response.status){

        this.listRole=response.result;
        console.log(this.listRole)
      }else{
        this.listRole=[];
      }
    });
    this.userService.getUsers().subscribe((response: any) => {
      if(response){
        this.users=response.result;
      }else{
        this.users=[];
      }
    });
  }

  onSubmit() {
    this.isSubmitted=true;
    console.log({formValue:this.userForm.value})
    // if(this.userForm.invalid){
    //   alert("Please fill the required field")
    //   return;
    // }
    const userData = this.userForm.value;
    this.userService.saveOrUpdateUser(userData).subscribe((response:any)=>{
      if(response.status){
        alert("Success!")
        this.resetForm();
        this.refreshUserList();
      }else{
        alert("Failed!")
      }
    },(err:any)=>{
      alert("Please fill the required field!")
    })
  }

  refreshUserList() {
    this.userService.getUsers().subscribe((response:any) => {
      if(response){
        this.users=response.result;
      }else{
        this.users=[];
      }
    });
  }

  editUser(id:number) {
    this.userService.getUsersById(id).subscribe((response:any) => {
      if(response){
        this.userForm.patchValue(response.result);
        this.btnStatus="Update";
      }else{
        this.btnStatus="Save";
      }
    });

  }

  resetForm() {
    this.userForm.reset({
      UserId: 0,
      UserName: '',
      Email: '',
      RoleId: 0,
      Password: '',
      ConfirmPassword: '',
      Phone: '',
      Active: true,
    });
    this.btnStatus="Save";
  }
}
