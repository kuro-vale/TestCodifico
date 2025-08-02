import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Employee} from "../../models/employee.model";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private readonly endpoint = `${environment.apiUrl}/employees`
    private readonly client = inject(HttpClient);

    getEmployees() {
        return this.client.get<Employee[]>(`${this.endpoint}`);
    }
}
