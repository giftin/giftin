import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

 
    apiUrl = 'https://beta.portal.janbazar.in/api/';

  selectedUser: User = {
    
    email: '',
    password: '',
    mobile: ''
  };


  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user, this.noAuthHeader);
  }

  login(authCredentials:any) {
    return this.http.post(`${this.apiUrl}/login`, authCredentials, { responseType: 'text' });
  }

  getUserProfile() {
    return this.http.get(`${this.apiUrl}/user/userProfile`);
  }

  setToken(token: string) {
    console.log('token saved')
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else { return null; }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}