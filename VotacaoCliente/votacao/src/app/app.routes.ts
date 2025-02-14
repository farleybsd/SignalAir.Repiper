import { Routes } from '@angular/router';
import { HomeComponent } from '../componets/home/home.component';
import { PollListComponent } from '../componets/poll-list/poll-list.component';
import { PollDetailsComponent } from '../componets/poll-details/poll-details.component';
import { PollResultsComponent } from '../componets/poll-results/poll-results.component';
import { CreatePollComponent } from '../componets/create-poll/create-poll.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home page
  { path: 'polls', component: PollListComponent }, // View all polls
  { path: 'poll/:pollId', component: PollDetailsComponent }, // Poll details and voting
  { path: 'poll/:pollId/results', component: PollResultsComponent }, // Real-time results
  { path: 'create-poll', component: CreatePollComponent }, // Create new poll page
];
