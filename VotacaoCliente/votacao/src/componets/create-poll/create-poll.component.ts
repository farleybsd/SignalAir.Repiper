import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common'; // Import necessário para *ngIf e *ngFor
import { ReactiveFormsModule } from '@angular/forms'; // Import necessário para formulários reativos
import { PollService } from '../../Services/PollService';

@Component({
  selector: 'app-create-poll',
  standalone: true,
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css'],
  imports: [CommonModule, ReactiveFormsModule] // Adicione esta linha!
})
export class CreatePollComponent {
  pollForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pollService: PollService,
    private router: Router
  ) {
    this.pollForm = this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([this.createOption(), this.createOption()]),
    });
  }

  get options(): FormArray {
    return this.pollForm.get('options') as FormArray;
  }

  createOption(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
    });
  }

  addOption(): void {
    this.options.push(this.createOption());
  }

  submitPoll(): void {
    if (this.pollForm.invalid) {
      this.errorMessage = 'Please fill in the question and all options.';
      return;
    }

    const pollData = {
      question: this.pollForm.value.question,
      options: this.pollForm.value.options.map((opt: any) => opt.text),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    this.pollService.createPoll(pollData).subscribe({
      next: () => {
        console.log('Poll created successfully');
        this.router.navigate(['/polls']);
      },
      error: (err) => {
        this.errorMessage = `Failed to create poll: ${err.error.message || 'Error connecting to the server.'}`;
      },
    });
  }
}
