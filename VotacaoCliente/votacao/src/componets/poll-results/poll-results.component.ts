import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { Option } from '../../Interfaces/Option';
import { CommonModule } from '@angular/common'; // Import necessário para *ngIf e *ngFor
@Component({
  selector: 'app-poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.css'],
  imports: [CommonModule] // Adicione esta linha!
})
export class PollResultsComponent implements OnInit, OnDestroy {
  options: Option[] = [];
  private connection: signalR.HubConnection | null = null;
  private pollId: number | null = null;


  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.pollId = Number(this.route.snapshot.paramMap.get('pollId'));
    if (this.pollId) {
      this.fetchInitialResults(this.pollId);
      this.setupSignalRConnection();
    }
  }
  private fetchInitialResults(pollId: number): void {
    this.http.get<Option[]>(`http://localhost:5093/api/polls/${pollId}/results`)
      .subscribe(
        (results) => this.options = results,
        (error) => console.error('Error fetching poll results:', error)
      );
  }

  private setupSignalRConnection(): void {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5093/voteHub')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.start()
      .then(() => {
        console.log('Connected to SignalR hub');
        this.connection?.on('ReceiveVoteUpdate', (updatedPollId: number, updatedOptions: Option[]) => {
          if (updatedPollId === this.pollId) {
            this.options = updatedOptions;
          }
        });
      })
      .catch(err => console.error('Error connecting to SignalR hub:', err));
  }

  getPercentage(votes: number): number {
    const maxVotes = Math.max(...this.options.map(o => o.votes), 1);
    return (votes / maxVotes) * 100;
  }

  ngOnDestroy(): void {
    if (this.connection) {
      this.connection.stop();
    }
  }
}
