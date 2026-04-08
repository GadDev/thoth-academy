import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Riddle {
  question: string;
  answer: string;
}

const RIDDLES: Riddle[] = [
  {
    question:
      'I speak without a mouth and hear without ears. I have no body, yet I come alive with wind. What am I?',
    answer: 'Echo',
  },
  {
    question: 'The more you take, the more you leave behind. What am I?',
    answer: 'Footsteps',
  },
  {
    question: "I am not alive, but I grow. I don't have lungs, but I need air. What am I?",
    answer: 'Fire',
  },
];

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  readonly currentRiddle = signal(this.getRandomRiddle());
  readonly showAnswer = signal(false);

  private getRandomRiddle(): Riddle {
    return RIDDLES[Math.floor(Math.random() * RIDDLES.length)];
  }

  toggleAnswer(): void {
    this.showAnswer.update((value) => !value);
  }

  nextRiddle(): void {
    this.showAnswer.set(false);
    this.currentRiddle.set(this.getRandomRiddle());
  }
}
