import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
//import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  authTokenB: any;
  authTokenO: any;
  user: any;
  usertype: any;
  booth: any;

  constructor(private http: Http) {
    this.authToken = localStorage.getItem('id_token');
    this.user = localStorage.getItem('user');
    
  }
 // register authentication
  registerUser(user) {
    console.log(user.email);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  registerOperator(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register_po', user, {headers: headers})
      .map(res => res.json());
  }

  registerBooth(user) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register_booth', user, {headers: headers})
      .map(res => res.json());
  }

  registerVoter(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register_voter', user, {headers: headers})
      .map(res => res.json());
  }

  registerParty(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register_party', user, {headers: headers})
      .map(res => res.json());
  }

  registerCandidate(user) {
    console.log(user.nic);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register_candidate', user, {headers: headers})
      .map(res => res.json());
  }

  updateCandidate(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/update_candidate', user, {headers: headers})
      .map(res => res.json());
  }

  updateVoter(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/update_voter', user, {headers: headers})
      .map(res => res.json());
  }

  updateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/update_user', user, {headers: headers})
      .map(res => res.json());
  }

  ChangePassword(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/change_pwd', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateOperator(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate_po', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateVoter(voter) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate_voter', voter, {headers: headers})
      .map(res => res.json());
  }

  authenticateBooth(booth) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate_booth', booth, {headers: headers})
      .map(res => res.json());
  }
  
  // getting profile with the token
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }
  getBooth() {
    let headers = new Headers();
    this.loadBoothToken();
    headers.append('Authorization', this.authTokenB);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/booth_profile', {headers: headers})
      .map(res => res.json());
  }

  getOperator() {
    let headers = new Headers();
    this.loadOperatorToken();
    headers.append('Authorization', this.authTokenO);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/po_profile', {headers: headers})
      .map(res => res.json());
  }

  getAccess(){
    return this.http.get('http://localhost:3000/users/access')
      .map(res => res.json());
  }

  newElections() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/new_election', {headers: headers})
      .map(res => res.json());
  }

  startElection() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/start_election', {headers: headers})
      .map(res => res.json());
  }

  stopElection() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/stop_election', {headers: headers})
      .map(res => res.json());
  }

  releaseResult() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/release_results', {headers: headers})
      .map(res => res.json());
  }


  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    this.usertype = user.usertype;
  }

  storeOperatorData(token, user) {
    localStorage.setItem('op_token', token);
    localStorage.setItem('operator', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    this.usertype = user.usertype;
  }

  storeBoothData(token, booth) {
    localStorage.setItem('booth_token', token);
    localStorage.setItem('booth', JSON.stringify(booth));
    this.authToken = token;
    this.booth = booth;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadBoothToken() {
    const token = localStorage.getItem('booth_token');
    this.authTokenB = token;
  }

  loadOperatorToken() {
    const token = localStorage.getItem('op_token');
    this.authTokenO = token;
  }

  getUser(){
    return this.user;
  }
  loggedIn() {
    return tokenNotExpired('id_token');
  }

  IsloggedIn() {

    return tokenNotExpired('booth_token');

  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

