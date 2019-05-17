import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-home',
	templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
	registerForm: FormGroup;
	submitted = false;
	firstApiData;
	secondApiData;
	thirdApiData;

	maxDate = (new Date().getFullYear()).toString() + "-0" + (new Date().getMonth() + 1).toString() + "-" + (new Date().getDate() - 1).toString();

	constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private authenticationService: AuthenticationService, private router: Router) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			firstName: ['', [Validators.required, Validators.maxLength(10)]],
			lastName: ['', [Validators.required, Validators.maxLength(10)]],
			email: ['', [Validators.required, Validators.email]],
			dob: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.registerForm.controls;
	}

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}

		this.authenticationService.register(this.registerForm.value)
			.subscribe(data => {
				console.log(data);
				alert('Succesfully Registered');
				this.router.navigate(['/login']);
			});
	}

	forkJoinFunction() {
		this.firstApiData = this.httpClient.get(environment.baseApi + '/products');
		this.secondApiData = this.httpClient.get(environment.baseApi + '/locations');
		this.thirdApiData = this.httpClient.get(environment.baseApi + '/families');

		forkJoin([this.firstApiData, this.secondApiData, this.thirdApiData]).subscribe(results => {
			console.log(results);
		})
	}

}
