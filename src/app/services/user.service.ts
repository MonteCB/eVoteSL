import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

 

  getVoter(){
    return this.http.get('http://localhost:3000/users/voter')
      .map(res => res.json());
  }

  getCandidate(){
    return this.http.get('http://localhost:3000/users/candidate')
      .map(res => res.json());
  }

  getParty(){
    return this.http.get('http://localhost:3000/users/party')
      .map(res => res.json());
  }

  getPollStation(){
    return this.http.get('http://localhost:3000/users/poll_station')
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
    return this.http.post('http://localhost:3000/users/mark_booth_deactivate', currentBooth,  {headers: headers})
      .map(res => res.json());
  }

  markBoothActive(currentBooth){
    let headers = new Headers();
    console.log(currentBooth.id);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/mark_booth_activate', currentBooth,  {headers: headers})
      .map(res => res.json());
  }

  markVoter(currentVoter){
    let headers = new Headers();
    //console.log(currentVoter.id);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/mark_voter', currentVoter,  {headers: headers})
      .map(res => res.json());
  }

  markPollStation(currentPoll){
    let headers = new Headers();
    //console.log(currentVoter.id);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/mark_poll', currentPoll,  {headers: headers})
      .map(res => res.json());
  }

}
