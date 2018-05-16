import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

 

  getVoter(){
    return this.http.get('/users/voter')
      .map(res => res.json());
  }

  getCandidate(){
    return this.http.get('/users/candidate')
      .map(res => res.json());
  }

  getParty(){
    return this.http.get('/users/party')
      .map(res => res.json());
  }

  getPollStation(){
    return this.http.get('/users/poll_station')
      .map(res => res.json());
  }

  deleteVoter(id){
    return this.http.delete('/users/voter/'+ id)
      .map(res => res.json());
  }

  deleteCandidate(id){
    return this.http.delete('/users/candidate/'+ id)
      .map(res => res.json());
  }

  placeVote(_vote){
    let headers = new Headers();
    console.log(_vote.id);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/vote', _vote,  {headers: headers})
      .map(res => res.json());
  }

  markBooth(currentBooth){
    let headers = new Headers();
    console.log(currentBooth.id);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/mark_booth_deactivate', currentBooth,  {headers: headers})
      .map(res => res.json());
  }

  markBoothActive(currentBooth){
    let headers = new Headers();
    console.log(currentBooth.id);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/mark_booth_activate', currentBooth,  {headers: headers})
      .map(res => res.json());
  }

  markVoter(currentVoter){
    let headers = new Headers();
    //console.log(currentVoter.id);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/mark_voter', currentVoter,  {headers: headers})
      .map(res => res.json());
  }

  resetData(){
    let headers = new Headers();
    //console.log(currentVoter.id);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/reset',  {headers: headers})
      .map(res => res.json());
  }

  markPollStation(currentPoll){
    let headers = new Headers();
    //console.log(currentVoter.id);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/mark_poll', currentPoll,  {headers: headers})
      .map(res => res.json());
  }

}
