import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const RESOURCE1_API_BASE = "/api-resource1/";

@Injectable()
export class SampleService {
    constructor(private http: HttpClient) {}

    searchBasicForm() {
        return this.http.get(RESOURCE1_API_BASE + 'WeatherForecast');
    }
}