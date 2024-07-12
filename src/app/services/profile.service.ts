import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileItems } from '../interfaces/profile-items';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  api = 'http://localhost:3000/profiles';

  constructor(private http: HttpClient) { }

  findAll(): Observable<ProfileItems[]> {
    return this.http.get<ProfileItems[]>(this.api);
  }

  register(profile: ProfileItems): Observable<ProfileItems> {
    return this.http.post<ProfileItems>(this.api, profile);
  }

  update(updatedProfile: ProfileItems): Observable<ProfileItems[]> {
    const url = `${this.api}/${updatedProfile.id}`;
    return this.http.put<ProfileItems[]>(url, updatedProfile);
  }

  deleteProfile(id: string): Observable<void> {
    const url = `${this.api}/${id}`;
    return this.http.delete<void>(url);
  }
}
