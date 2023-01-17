import { ObserversModule } from '@angular/cdk/observers';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { ApiResponce } from '../../models/apiResponce.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient : HttpClient) { }

 

  getAllPost() : Observable<ApiResponce>{
    return this.httpClient.get<ApiResponce>('http://localhost:3000/post/getAll');
    
  }

  createPost(post : any): Observable<ApiResponce>{
    const headers = { 'content-type': 'application/json'} 
    const body=JSON.stringify(post);
    return this.httpClient.post<ApiResponce>('http://localhost:3000/post/create',body,{'headers':headers});
    
  }

  GetUserost(post : any): Observable<ApiResponce>{
    const headers = { 'content-type': 'application/json'} 
    const body=JSON.stringify(post);
    return this.httpClient.post<ApiResponce>('http://localhost:3000/post/getPost',body,{'headers':headers});
    
  }

  CheckOut(post : any): Observable<any>{
    const headers = { 'content-type': 'application/json'} 
    const body=JSON.stringify(post);
    return this.httpClient.post<any>('http://localhost:3000/post/checkout',{items:post},{'headers':headers});
    
  }

  UpdatePost(post : any): Observable<ApiResponce>{
    const headers = { 
      'content-type': 'application/json'} 
    const body=JSON.stringify(post);
    return this.httpClient.put<ApiResponce>('http://localhost:3000/post/update',body,{'headers':headers});
  }

  DeletePost(id : number): Observable<ApiResponce>{
    const headers = { 
      'content-type': 'application/json',
      'Access-Control-Allow-Methods' : 'true'
  } 
    return this.httpClient.delete<ApiResponce>('http://localhost:3000/post/delete/'+id);
  }

}
