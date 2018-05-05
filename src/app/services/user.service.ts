import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  update(){
  }

  getVoter(){
    return this.http.get('http://localhost:3000/users/voter')
      .map(res => res.json());
  }

  getCandidate(){
    return this.http.get('http://localhost:3000/users/candidate')
      .map(res => res.json());
  }

  deleteVoter(id){
    return this.http.delete('http://localhost:3000/users/voter/'+ id)
      .map(res => res.json());
  }

  deleteCandidate(id){
    return this.http.delete('http://localhost:3000/users/candidate/'+ id)
      .map(res => res.json());
  }

  placeVote(_vote){
    let headers = new Headers();
    console.log(_vote.id);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/vote', _vote,  {headers: headers})
      .map(res => res.json());
  }

  markBooth(currentBooth){
    let headers = new Headers();
    console.log(currentBooth.id);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/mark_booth', currentBooth,  {headers: headers})
      .map(res => res.json());
  }

}
