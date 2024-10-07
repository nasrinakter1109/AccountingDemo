import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleModel } from 'src/app/models/role';
import { UserModel } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ModalService } from 'src/app/Shared/modal.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  btnStatus:string="Save";
  isSubmitted:boolean=false;
  listRole:RoleModel[] = [ ];

  users: UserModel[] = [];

  constructor(private userService: UserService, private fb: FormBuilder,private modalService: ModalService) {

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
    if(this.userForm.valid){
      const userData = this.userForm.value;
      this.userService.saveOrUpdateUser(userData).subscribe((response:any)=>{
        if(response.status){
          this.modalService.show('Success', 'Form submitted successfully!');
          //this.resetForm();
          this.refreshUserList();
        }else{
          this.modalService.show('Failed', 'Form submitted Failed!');
        }
      },(err:any)=>{
        alert("Please fill the required field!")
      })
    }else{
      this.modalService.show('Error', 'Please fill out all required fields.');
    }

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
    this.modalService.show('Info', 'Form has been reset.');
  }
}
