import { Component, OnInit } from '@angular/core';
import { Privilege } from '../../models/privilege';
import { RoleModel } from '../../models/role';
import { PrivilegeService } from '../../services/privilege.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-role-permission',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './role-permission.component.html',
  styleUrl: './role-permission.component.css'
})
export class RolePermissionComponent implements OnInit {
  roles: RoleModel[] = [];
  privileges: Privilege[] = [];
  selectedRoleId: number = 0;

  constructor(private privilegeService: PrivilegeService,private userService: UserService) {}

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
      alert('Privileges updated successfully!');
    } else {
      alert('Please select a role first.');
    }
  }

}
