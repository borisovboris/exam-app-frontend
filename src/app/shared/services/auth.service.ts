import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/core/app-settings';

// provided in the providers array of SharedModule, not tree-shakable
@Injectable()

export class AuthService {

  private readonly baseUrl: string = `${AppSettings.API_ENDPOINT}/auth`;

  constructor(private readonly http: HttpClient) { }

  getUserOccupation() {
    return this.http.get<any>(`${this.baseUrl}/get-occupation`);
  }

  public logout(): void {
    localStorage.removeItem('token_id');
  }
}
