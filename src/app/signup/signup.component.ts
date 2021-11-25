import { HttpClient } from '@angular/common/http';
import { FormGroup} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
public signupform !:FormGroup;
  constructor(private formBuilder : FormBuilder,public http: HttpClient,public router: Router) { }

  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      fullName:[''],
      mobileNumber:[''],
      emailAddress:[''],
      password:['']
    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/signupUsers",this.signupform.value)
    .subscribe(res=>{
      alert("Signup Sucessfull")
      this.signupform.reset();
      this.router.navigate(['login'])
    },err=>{
      alert("Something went wrong")
    })

  }
}