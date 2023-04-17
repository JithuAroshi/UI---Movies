import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

userdata:FormGroup;

constructor( private fb : FormBuilder , private authservice : AuthService , private route : Router , private msg : ToastrService ) {

this.userdata = this.fb.group({
  username:['',Validators.required],
  password:['',Validators.required]
})

}


  login(){
const { username , password } = this.userdata.value;

this.authservice.login(username,password).subscribe({
  next:(res)=>{ this.msg.success('Login Successfully')
  this.route.navigate(['/user'])
},
error:(err) => this.msg.error(err.error.message)
})



  }

}
