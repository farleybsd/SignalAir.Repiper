import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from '../../Services/PollService';
import { Poll } from '../../Interfaces/Option';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css'],
  imports: [CommonModule] // Adicione esta linha!
})
export class PollListComponent implements OnInit {
  polls: Poll[] = [];

  constructor(private pollService: PollService, private router: Router) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  private loadPolls(): void {
    this.pollService.getPolls().subscribe({
      next: (data)  =>{
        this.polls = data;
        console.log(data)
      } ,
      error: (err) => console.error('Error fetching polls:', err),
    });
  }

  navigateToPoll(pollId: number): void {
    this.router.navigate([`/poll/${pollId}`]);
  }

  navigateToResults(pollId: number): void {
    this.router.navigate([`/poll/${pollId}/results`]);
  }
}
