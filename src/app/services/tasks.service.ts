import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private api = 'https://localhost:44320/api';
  
  constructor( private http: HttpClient) { }

  Add( Task: any){
    const path = `${this.api}/Task/Add`;
    return this.http.post(path, Task);
  }

  ListPerson(){
    const path = `${this.api}/Task/ListPerson`;
    return this.http.get(path);
  }

  ListTasks( ID: number ){
    const path = `${this.api}/Task/ListTasks/`+ID;
    return this.http.get(path);
  }

  Update(Task: any){
    const path = `${this.api}/Task/Update/`;
    return this.http.put(path, Task);
  }

  Delete( ID: number ){
    const path = `${this.api}/Task/Delete/`+ID;
    return this.http.get(path);
  }

}
