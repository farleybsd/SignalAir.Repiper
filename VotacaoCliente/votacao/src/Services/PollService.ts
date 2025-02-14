import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll } from '../Interfaces/Option';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private apiUrl = 'http://localhost:5093/api/polls';

  constructor(private http: HttpClient) {}

  createPoll(pollData: any): Observable<any> {
    return this.http.post(this.apiUrl, pollData);
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Fetches all polls from the server.
/******  965a7a5e-9592-44eb-8809-8157de0372bf  *******/  }

  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(this.apiUrl);
  }
  getPollById(pollId: string): Observable<Poll> {
    return this.http.get<Poll>(`${this.apiUrl}/${pollId}`);
  }

  vote(pollId: number, voteData: { userId: string; optionId: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${pollId}/vote`, voteData);
  }
}
