
import {Injectable, OnInit} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SearchService implements OnInit{
  //private JSONUrl = 'file:///home/natasha/workspace/js/angular-seed-master/src/client/app/flights.json';
  private JSONUrl = 'flights.json';
  constructor (private http: HttpClient) {};

  ngOnInit(): void {
    // Make the HTTP request:
    //this.http.get(this.JSONUrl).subscribe(data => {
    //  // Read the result field from the JSON response.
    //  this.results = data['results'];
    //});
  }

}
