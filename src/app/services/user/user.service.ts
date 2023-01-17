import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { ApiResponce } from '../../models/apiResponce.model';

@Injectable({
  providedIn: 'root',

})

export class UserService {
  
  constructor(private httpClient : HttpClient) { }
 
  getAllUser() : Observable<ApiResponce>{
    return this.httpClient.get<ApiResponce>('http://localhost:3000/user/getAll');
  }

  getUser(email:string):Observable<ApiResponce>{

    const headers = { 'content-type': 'application/json'} 
    const body=JSON.stringify({
      'email':email
    });
    return this.httpClient.post<ApiResponce>('http://localhost:3000/user/getUser',body,{'headers':headers});
  }

  UserLoginCheck(email:string,password:string):Observable<ApiResponce>{
    const headers = { 'content-type': 'application/json'} 
    const body=JSON.stringify({
      'email':email,
      'password':password
    });
    return  this.httpClient.post<ApiResponce>('http://localhost:3000/user/userLogin',
    body,{'headers':headers});
  }

  UserLoginCheckAdmin(email:string,password:string):Observable<ApiResponce>{
    const headers = { 'content-type': 'application/json'} 
    const body=JSON.stringify({
      'email':email,
      'password':password
    });
    return  this.httpClient.post<ApiResponce>('http://localhost:3000/user/userLogin',
    body,{'headers':headers});
  }
  
  UserLoginCheck2(email:string,password:string):Array<ApiResponce>{
    const headers = { 'content-type': 'application/json'} 
    const body=JSON.stringify({
      'email':email,
      'password':password
    });

    var responce = new Array<ApiResponce>;
    this.httpClient.post('http://localhost:3000/user/userLogin',body,{'headers':headers})
    .subscribe({
      next(position) {
        var res =JSON.parse( JSON.stringify(position));
        
        responce.push(res);
    

      },
    }); 
    return responce;
  }
  
  createUser(user : any): Observable<ApiResponce>{
    const headers = { 'content-type': 'application/json'} 
    const body=JSON.stringify(user);
    return this.httpClient.post<ApiResponce>('http://localhost:3000/user/create',body,{'headers':headers});
    
  }
  DeleteUser(id : number): Observable<ApiResponce>{
    const headers = { 
      'content-type': 'application/json',
      'Access-Control-Allow-Methods' : 'true'
  } 
    return this.httpClient.delete<ApiResponce>('http://localhost:3000/user/delete/'+id);
  }
}


