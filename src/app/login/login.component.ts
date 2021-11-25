import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.emailAddress === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );

          
    
        });
        if (user) {
          alert('Login sucess');
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        } else {
          alert('User not found');
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
}
