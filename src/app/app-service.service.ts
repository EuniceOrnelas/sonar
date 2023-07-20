import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  user="admin";
  pass="password";
  authorizationData = 'Basic ' + btoa(this.user + ':' + this.pass);

  headerOptions = {
    'Accept': 'application/json',
    'Authorization': this.authorizationData
  };
  constructor(private http: HttpClient) //no autocompletó ni puso sugerencias para la instancia de http
  { }

  generateImage(prompt) {
    return this.http.post('/ai/generateImage', {prompt});
  }

  createCompletion(msg) {
    return this.http.post('/ai/createCompletion', { msg });
  }


}
