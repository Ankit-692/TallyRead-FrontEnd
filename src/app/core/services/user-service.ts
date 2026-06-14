import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userProfileHash: string | null = null;
  private backendApi = import.meta.env['NG_APP_BACKEND_URL'];
  constructor(private http: HttpClient) {}

  async getProfileLink(): Promise<void> {
    if (!this.userProfileHash) {
      const res = await firstValueFrom(
        this.http.get<{ profileHash: string }>(`${this.backendApi}/api/getUserProfileId`),
      );
      this.userProfileHash = res.profileHash;
    }

    const url = `${window.location.origin}/userProfile/${this.userProfileHash}`;
    await navigator.clipboard.writeText(url);
  }
}
