import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }
  storageData:any;

  getJson(URL: string) {
    return this.http.get(URL);
  }
  post(URL: string,payload: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Origin': '*'
      })}

    // const headers = new HttpHeaders();
    // headers.append('Access-Control-Allow-Headers', 'Content-Type');
    // headers.append('Access-Control-Allow-Methods', 'POST');
    // headers.append('Access-Control-Allow-Origin', '*');

    
    return this.http.post(URL,payload,httpOptions);
  }
  getStorage(){
    return this.storageData;
  }
  setStorage(data:any){
    this.storageData = data;
  }
}
//
