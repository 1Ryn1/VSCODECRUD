import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { employeeModel } from './employee dashboard.model';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup
  EmployeeData! : any;
  employeeModelObject : employeeModel= new employeeModel();

  constructor(public formbuilder: FormBuilder,public api :ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
    this.getAllEmployee();
  }
  postEmployeeDetail(){
    this.employeeModelObject.firstName=this.formValue.value.firstName;
    this.employeeModelObject.lastName=this.formValue.value.lastName;
    this.employeeModelObject.email=this.formValue.value.email;
    this.employeeModelObject.mobile=this.formValue.value.mobile;
    this.employeeModelObject.salary=this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObject)
    .subscribe((res)=>{
      console.log(res);
      alert("Employee Added Sucessfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something Went Wrong")
    })

    }
    getAllEmployee(){
     this.api.getEmployee(this.employeeModelObject)
     .subscribe((res)=>{
      this.EmployeeData=res;
    })
    }

    deleteEmployee(row :any){
      this.api.deleteEmployee(row.id)
      .subscribe(res=>{
        alert("Employee Deleted")
        this.getAllEmployee();
      })
    }

  }
