import { Component, OnInit } from '@angular/core';
import { Privilege } from 'src/app/models/privilege';
import { RoleModel } from 'src/app/models/role';
import { PrivilegeService } from 'src/app/services/privilege.service';
import { UserService } from 'src/app/services/user.service';
import { ModalService } from 'src/app/Shared/modal.service';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.css']
})
export class RolePermissionComponent implements OnInit {
  roles: RoleModel[] = [];
  privileges: Privilege[] = [];
  selectedRoleId: number = 0;

  constructor(private privilegeService: PrivilegeService,private userService: UserService,private modalService: ModalService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.userService.getRoles().subscribe((data:any) => {
      if(data.status){
        this.roles=data.result;
      }else{
        this.roles=[];
      }
    });
  }

  onRoleChange(roleId: number): void {
    if (roleId) {
      this.privilegeService.getPrivilegesByRoleId(roleId).subscribe((data:any) => {
        if(data.status){
          this.privileges = data.result;
        }else{
          this.privileges = [];
        }
      });
    } else {
      this.privileges = [];
    }
  }

  savePrivileges(): void {
    if (this.selectedRoleId > 0) {
      this.privileges.forEach((privilege) => {
         this.privilegeService.savePrivilege(privilege).subscribe();
      });
      this.modalService.show('Success', 'Privileges updated successfully!!');
    } else {
      this.modalService.show('Error', 'Please fill out all required fields.');
    }
  }

}
