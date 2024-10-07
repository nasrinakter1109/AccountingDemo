export class UserModel {
  UserId: number =0;
  RoleId: number =0;
  UserName: string ="";
  Email: string ="";
  Phone?: string;
  Password: string ="";
  ConfirmPassword?: string;
  Active: boolean =true;
}
