import { Component, OnInit } from '@angular/core';
import { Poll } from '../../Interfaces/Option';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PollService } from '../../Services/PollService';

@Component({
  selector: 'app-poll-details',
  imports: [CommonModule],
  templateUrl: './poll-details.component.html',
  styleUrl: './poll-details.component.css'
})
export class PollDetailsComponent implements OnInit {
  poll: Poll | null = null;
  selectedOptionId: number | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pollService: PollService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pollId = this.route.snapshot.paramMap.get('pollId');
    if (pollId) {
      this.pollService.getPollById(pollId).subscribe(
        (poll) => {
          this.poll = poll;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching poll:', error);
          this.isLoading = false;
        }
      );
    }
  }

  selectOption(optionId: number): void {
    this.selectedOptionId = optionId;
  }

  submitVote(): void {
    if (!this.selectedOptionId) {
      alert('Please select an option to vote.');
      return;
    }

    this.pollService.vote(this.poll!.id, { userId: 'user123', optionId: this.selectedOptionId })
      .subscribe(
        (response) => {
          if (response) {
            this.router.navigate([`/poll/${this.poll!.id}/results`]);
          } else {
            alert('Error submitting vote.');
          }
        },
        (error) => {
          alert('Error submitting vote.');
          console.error('Error submitting vote:', error);
        }
      );
  }
}