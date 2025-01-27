import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/api/chat';

  constructor(private http: HttpClient) {}

  // Fetch all chat messages
  getChatData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new chat message
  addChatMessage(name: string, message: string): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, { name, message });
  }
}
