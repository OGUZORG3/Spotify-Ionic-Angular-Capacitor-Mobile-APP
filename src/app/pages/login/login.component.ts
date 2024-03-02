import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public usernameFormControl = new FormControl(null,[Validators.required,Validators.email]);
  public passwordFormControl = new FormControl(null,Validators.minLength(4));
  public rememberMeFormControl = new FormControl(false);
  public userForm!:FormGroup;
  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: this.usernameFormControl,
      userpassword: this.passwordFormControl,
      rememberMe:this.rememberMeFormControl
    });
  }
  public submit(){
    console.log(this.userForm.value)
  }
}
