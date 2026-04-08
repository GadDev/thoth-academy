import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

interface Riddle {
  question: string;
  answer: string;
}

const RIDDLES: Riddle[] = [
  {
    question:
      'I speak without a mouth and hear without ears.\nI have no body, yet I come alive with wind.',
    answer: 'Echo',
  },
  {
    question: 'The more you take, the more you leave behind.',
    answer: 'Footsteps',
  },
  {
    question: "I am not alive, but I grow.\nI don't have lungs, but I need air.",
    answer: 'Fire',
  },
  {
    question: `I have cities, but no houses.
I have mountains, but no trees.
I have water, but no fish.`,
    answer: 'Map',
  },
  {
    question: `I am always in front of you but can never be seen.`,
    answer: 'Future',
  },
  {
    question: `The more of me you take, the more you leave behind.`,
    answer: 'Footsteps',
  },
  {
    question: `I am taken from a mine and shut inside a wooden case,
yet I am used by almost every soul.`,
    answer: 'Pencil lead',
  },
  {
    question: `I can fly without wings,
cry without eyes,
wherever I go, darkness follows me.`,
    answer: 'Cloud',
  },
  {
    question: `I have keys but no locks.
I have space but no room.
You can enter, but you cannot go outside.`,
    answer: 'Keyboard',
  },
  {
    question: `What is always running but never moves?`,
    answer: 'Time',
  },
  {
    question: `I have one eye but cannot see.`,
    answer: 'Needle',
  },
  {
    question: `The more you remove from me, the bigger I become.`,
    answer: 'Hole',
  },
  {
    question: `I begin with T, end with T, and have T in me.`,
    answer: 'Teapot',
  },
];

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, FormsModule, TranslocoPipe],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  readonly currentRiddle = signal(this.getRandomRiddle());
  readonly revealed = signal(false);
  readonly guess = signal('');
  readonly guessResult = signal<'correct' | 'wrong' | null>(null);

  readonly guessNormalized = computed(() => this.guess().trim().toLowerCase());

  private getRandomRiddle(): Riddle {
    return RIDDLES[Math.floor(Math.random() * RIDDLES.length)];
  }

  submitGuess(): void {
    const correct = this.guessNormalized() === this.currentRiddle().answer.toLowerCase();
    this.guessResult.set(correct ? 'correct' : 'wrong');
    if (correct) {
      this.revealed.set(true);
    }
  }

  revealAnswer(): void {
    this.revealed.set(true);
    this.guessResult.set(null);
  }

  nextRiddle(): void {
    this.revealed.set(false);
    this.guess.set('');
    this.guessResult.set(null);
    this.currentRiddle.set(this.getRandomRiddle());
  }

  onGuessInput(value: string): void {
    this.guess.set(value);
    this.guessResult.set(null);
  }
}
