import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-employee',
    templateUrl: 'employee.component.html',
    styleUrls: ['employee.component.css']
})

export class EmployeeComponent implements OnInit {

    addEmployeeForm: FormGroup;
    updateEmployeeForm: FormGroup;
    submitted = false;
    updated = false;
    employeeData: any;
    display: any;
    display2: any;
    p: number = 1;
    employeeId: any;
    employeeName: any;
    employeeDes: any;
    employeeSalary: any;
    employeeRetirement: any;
    employeeStatus: any;

    minDate = (new Date()).toString();

    constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {

    }

    ngOnInit() {
        this.authenticationService.employeeData()
            .subscribe(res => {
                this.employeeData = res;
            });

        this.addEmployeeForm = this.formBuilder.group({
            emp_id: ['', [Validators.required, Validators.maxLength(10)]],
            name: ['', [Validators.required, Validators.maxLength(20)]],
            designation: [''],
            salary: ['', Validators.required],
            retirementDate: ['', Validators.required],
            status: ['']
        });

        this.updateEmployeeForm = this.formBuilder.group({
            emp_id: ['', [Validators.required, Validators.maxLength(10)]],
            name: ['', [Validators.required, Validators.maxLength(20)]],
            designation: [''],
            salary: ['', Validators.required],
            retirementDate: ['', Validators.required],
            status: ['']
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.addEmployeeForm.controls;
    }

    get g() {
        return this.updateEmployeeForm.controls;
    }

    openModal() {
        this.display = 'block';
    }

    onCloseHandled() {
        this.display = 'none';
    }

    openModal2(data) {
        this.display2 = 'block';
        this.employeeId = data.emp_id;
        this.employeeName = data.name;
        this.employeeDes = data.designation;
        this.employeeSalary = data.salary;
        this.employeeRetirement = data.retirementDate;
        this.employeeStatus = data.status;
    }

    onCloseHandled2() {
        this.display2 = 'none';
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.addEmployeeForm.invalid) {
            return;
        }

        this.authenticationService.addEmployeeData(this.addEmployeeForm.value)
            .subscribe(data => {
                console.log(data);
                alert('Succesfully Added');
                window.location.reload();
            });
    }

    delete(data: any) {
        console.log(data);
        this.authenticationService.deleteEmployeeData(data.id)
            .subscribe(data => {
                console.log(data);
                alert('Succesfully Deleted');
                window.location.reload();
            })
    }

    update() {
        console.log(1);
        // this.authenticationService.updateEmployeeData(data)
        //     .subscribe(data => {
        //         console.log(data);
        //         alert('Updated Succwesfully');
        //         window.location.reload();
        //     })
        this.updated = true;
        console.log(this.updateEmployeeForm.value);

        // stop here if form is invalid
        if (this.updateEmployeeForm.invalid) {
            return;
        }

        console.log(this.updateEmployeeForm.value);
    }
}
