import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    date = new Date().toString();

    constructor(private httpClient: HttpClient) { }

    register(values: any) {
        return this.httpClient.post(environment.baseApi + '/registeredUsers', values, { headers: new HttpHeaders().set('Content-Type', 'application/json') })
    }

    login(credentials: any) {
        return this.httpClient.get(environment.baseApi + '/registeredUsers?email=' + credentials.email + '&password=' + credentials.password)
    }

    employeeData() {
        return this.httpClient.get(environment.baseApi + '/employeeTable')
    }

    addEmployeeData(data: any) {
        console.log(data);
        return this.httpClient.post(environment.baseApi + '/employeeTable', data, { headers: new HttpHeaders().set('Content-Type', 'application/json') })
    }

    deleteEmployeeData(data: any) {
        return this.httpClient.delete(environment.baseApi + '/employeeTable/' + data)
    }

    updateEmployeeData(data: any) {
        return this.httpClient.put(environment.baseApi + '/employeeTable', data)
    }
}